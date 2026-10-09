<?php
/**
 * Customizer: business details, lead routing, social, tracking, photo slots.
 */
defined( 'ABSPATH' ) || exit;

add_action( 'customize_register', function ( WP_Customize_Manager $wp ) {
	$d = o1g_defaults();
	$wp->add_panel( 'o1g', [ 'title' => 'Ocean1Gutters Settings', 'priority' => 1 ] );

	$sections = [
		'business' => [ 'Business Details', [
			[ 'phone', 'Phone (display)', 'text' ], [ 'phone_raw', 'Phone (tel: link, e.g. +15617676528)', 'text' ], [ 'whatsapp', 'WhatsApp number (digits only, with country code)', 'text' ],
			[ 'email', 'Public email', 'email' ], [ 'street', 'Street address', 'text' ], [ 'city', 'City', 'text' ], [ 'state', 'State', 'text' ], [ 'zip', 'ZIP', 'text' ],
			[ 'legal_name', 'Legal name', 'text' ], [ 'license', 'License / insurance line', 'text' ], [ 'founded', 'Year founded', 'text' ],
		] ],
		'reviews' => [ 'Ratings & Social', [
			[ 'rating', 'Average rating (e.g. 4.9)', 'text' ], [ 'rating_count', 'Review count', 'text' ],
			[ 'google', 'Google review link', 'url' ], [ 'facebook', 'Facebook URL', 'url' ], [ 'instagram', 'Instagram URL', 'url' ], [ 'yelp', 'Yelp URL', 'url' ],
		] ],
		'leads' => [ 'Lead Routing & Tracking', [
			[ 'lead_email', 'Send lead notifications to (comma-separated)', 'text' ], [ 'webhook', 'Webhook URL (Zapier / Make / CRM) — optional', 'url' ], [ 'gtm_id', 'Google Tag Manager ID (GTM-XXXXXXX)', 'text' ],
		] ],
	];
	foreach ( $sections as $id => [ $title, $fields ] ) {
		$wp->add_section( "o1g_$id", [ 'title' => $title, 'panel' => 'o1g' ] );
		foreach ( $fields as [ $key, $label, $type ] ) {
			$wp->add_setting( "o1g_$key", [ 'default' => $d[ $key ] ?? '', 'sanitize_callback' => $type === 'url' ? 'esc_url_raw' : 'sanitize_text_field' ] );
			$wp->add_control( "o1g_$key", [ 'label' => $label, 'section' => "o1g_$id", 'type' => $type ] );
		}
	}

	// Photo slots (replace illustrated placeholders with real photos).
	$wp->add_section( 'o1g_photos', [ 'title' => 'Photos', 'panel' => 'o1g', 'description' => 'Upload real job photos. Each slot replaces an illustrated placeholder on the site.' ] );
	$slots = [ 'why_crew' => 'Home: crew at work (Why Us section)', 'before' => 'Home: BEFORE photo (comparison slider)', 'after' => 'Home: AFTER photo (comparison slider)', 'about_team' => 'About: team photo' ];
	foreach ( o1g_content()['services'] as $s ) { $slots[ str_replace( '-', '_', $s['slug'] ) ] = 'Service page: ' . $s['name']; }
	foreach ( $slots as $key => $label ) {
		$wp->add_setting( "o1g_img_$key", [ 'default' => 0, 'sanitize_callback' => 'absint' ] );
		$wp->add_control( new WP_Customize_Media_Control( $wp, "o1g_img_$key", [ 'label' => $label, 'section' => 'o1g_photos', 'mime_type' => 'image' ] ) );
	}
} );
