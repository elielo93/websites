<?php
/**
 * Leads: custom post type inbox + form handler (email, webhook, JSON response).
 */
defined( 'ABSPATH' ) || exit;

function o1g_register_lead_cpt(): void {
	register_post_type( 'o1g_lead', [
		'labels'       => [ 'name' => 'Leads', 'singular_name' => 'Lead', 'menu_name' => 'Leads', 'all_items' => 'All Leads' ],
		'public'       => false, 'show_ui' => true, 'show_in_menu' => true, 'menu_position' => 3, 'menu_icon' => 'dashicons-phone',
		'supports'     => [ 'title', 'editor' ], 'capability_type' => 'post', 'map_meta_cap' => true,
		'capabilities' => [ 'create_posts' => 'do_not_allow' ],
	] );
}
add_action( 'init', 'o1g_register_lead_cpt' );

add_filter( 'manage_o1g_lead_posts_columns', function ( $cols ) {
	return [ 'cb' => $cols['cb'], 'title' => 'Name', 'phone' => 'Phone', 'email' => 'Email', 'service' => 'Service', 'city' => 'City', 'source' => 'Source', 'date' => 'Received' ];
} );
add_action( 'manage_o1g_lead_posts_custom_column', function ( $col, $id ) {
	$v = get_post_meta( $id, "_lead_$col", true );
	if ( $col === 'phone' && $v ) { echo '<a href="tel:' . esc_attr( preg_replace( '/\D/', '', $v ) ) . '">' . esc_html( $v ) . '</a>'; }
	elseif ( $col === 'email' && $v ) { echo '<a href="mailto:' . esc_attr( $v ) . '">' . esc_html( $v ) . '</a>'; }
	else { echo esc_html( $v ); }
}, 10, 2 );

function o1g_lead_handler(): void {
	$is_fetch = ( $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '' ) === 'fetch';
	$respond = function ( array $payload, int $code = 200 ) use ( $is_fetch ) {
		status_header( $code );
		if ( $is_fetch ) { wp_send_json( $payload, $code ); }
		wp_safe_redirect( ! empty( $payload['ok'] ) ? o1g_thanks_url() : add_query_arg( 'error', '1', wp_get_referer() ?: home_url( '/' ) ) );
		exit;
	};

	if ( ! empty( $_POST['website'] ) ) { $respond( [ 'ok' => true, 'redirect' => o1g_thanks_url() ] ); } // honeypot
	$ts = (int) ( $_POST['ts'] ?? 0 );
	if ( $ts && ( microtime( true ) * 1000 - $ts ) < 1500 ) { $respond( [ 'ok' => false, 'error' => 'Too fast' ], 429 ); }

	// Rate limit: 5 per IP per hour.
	$ip  = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
	$key = 'o1g_rl_' . md5( $ip );
	$hits = (int) get_transient( $key );
	if ( $hits >= 5 ) { $respond( [ 'ok' => false, 'error' => 'Too many requests' ], 429 ); }
	set_transient( $key, $hits + 1, HOUR_IN_SECONDS );

	$f = fn( $k, $max = 500 ) => mb_substr( sanitize_text_field( wp_unslash( $_POST[ $k ] ?? '' ) ), 0, $max );
	$lead = [
		'name' => $f( 'name', 100 ), 'phone' => $f( 'phone', 30 ), 'email' => sanitize_email( wp_unslash( $_POST['email'] ?? '' ) ), 'city' => $f( 'city', 100 ),
		'service' => $f( 'service', 100 ), 'message' => mb_substr( sanitize_textarea_field( wp_unslash( $_POST['message'] ?? '' ) ), 0, 2000 ),
		'estimate' => $f( 'est_summary', 300 ), 'color' => $f( 'color_choice', 50 ), 'source' => $f( 'source', 50 ), 'page' => esc_url_raw( wp_unslash( $_POST['page'] ?? '' ) ), 'ip' => $ip,
	];
	$errors = [];
	if ( $lead['name'] === '' ) { $errors[] = 'name'; }
	if ( strlen( preg_replace( '/\D/', '', $lead['phone'] ) ) < 10 ) { $errors[] = 'phone'; }
	if ( ! is_email( $lead['email'] ) ) { $errors[] = 'email'; }
	if ( $errors ) { $respond( [ 'ok' => false, 'error' => 'Invalid: ' . implode( ', ', $errors ) ], 422 ); }

	// Store in Leads inbox.
	$lines = '';
	foreach ( $lead as $k => $v ) { if ( $v !== '' ) { $lines .= ucfirst( $k ) . ": $v\n"; } }
	$id = wp_insert_post( [ 'post_type' => 'o1g_lead', 'post_status' => 'publish', 'post_title' => $lead['name'] . ' — ' . $lead['service'], 'post_content' => $lines ] );
	if ( $id ) { foreach ( $lead as $k => $v ) { update_post_meta( $id, "_lead_$k", $v ); } }

	// Email.
	$to = array_map( 'trim', explode( ',', (string) o1g_opt( 'lead_email' ) ) );
	$subject = sprintf( 'New website lead: %s (%s, %s)', $lead['name'], $lead['service'], $lead['city'] );
	$body = "New lead from " . home_url() . "\n\n" . $lines . "\nReply fast: speed-to-lead wins the job.\nView all leads: " . admin_url( 'edit.php?post_type=o1g_lead' );
	wp_mail( $to, $subject, $body, [ 'Reply-To: ' . $lead['name'] . ' <' . $lead['email'] . '>' ] );

	// Webhook.
	if ( $hook = o1g_opt( 'webhook' ) ) {
		wp_remote_post( $hook, [ 'timeout' => 5, 'blocking' => false, 'headers' => [ 'Content-Type' => 'application/json' ], 'body' => wp_json_encode( $lead + [ 'date' => current_time( 'mysql' ) ] ) ] );
	}
	do_action( 'o1g_lead_received', $lead, $id );
	$respond( [ 'ok' => true, 'redirect' => o1g_thanks_url() ] );
}
add_action( 'admin_post_nopriv_o1g_lead', 'o1g_lead_handler' );
add_action( 'admin_post_o1g_lead', 'o1g_lead_handler' );
