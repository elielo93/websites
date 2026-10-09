<?php
/**
 * One-click content installer: Appearance → Ocean1 Setup.
 * Creates all pages (with designed templates), blog posts, menu, front page, permalinks. Idempotent.
 */
defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu', function () {
	add_theme_page( 'Ocean1 Setup', 'Ocean1 Setup', 'manage_options', 'o1g-setup', 'o1g_setup_page' );
} );

add_action( 'admin_notices', function () {
	if ( ! current_user_can( 'manage_options' ) || get_option( 'o1g_installed' ) || ( $_GET['page'] ?? '' ) === 'o1g-setup' ) { return; }
	echo '<div class="notice notice-info"><p><strong>Ocean1Gutters theme:</strong> install the pages, menu and blog posts in one click. <a class="button button-primary" href="' . esc_url( admin_url( 'themes.php?page=o1g-setup' ) ) . '">Open Ocean1 Setup</a></p></div>';
} );

function o1g_setup_page(): void {
	$done = false; $log = [];
	if ( isset( $_POST['o1g_install'] ) && check_admin_referer( 'o1g_install' ) ) { $log = o1g_install_content(); $done = true; }
	$installed = get_option( 'o1g_installed' );
	?>
	<div class="wrap"><h1>Ocean1Gutters Setup</h1>
	<?php if ( $done ) : ?><div class="notice notice-success"><p><strong>Done.</strong></p><ul style="list-style:disc;padding-left:20px"><?php foreach ( $log as $l ) { echo '<li>' . esc_html( $l ) . '</li>'; } ?></ul></div><?php endif; ?>
	<div class="card" style="max-width:720px;padding:20px">
		<h2>1. Install site content</h2>
		<p>Creates (or updates) every page with its designed layout, the five service pages, ten city pages, the blog posts, the Primary menu, sets the front page and blog page, and switches permalinks to <code>/blog/%postname%/</code>. Safe to run again: existing pages are matched by slug and updated, nothing is duplicated.</p>
		<form method="post"><?php wp_nonce_field( 'o1g_install' ); ?><button class="button button-primary button-hero" name="o1g_install" value="1"><?php echo $installed ? 'Re-run installer' : 'Install pages, menu & posts'; ?></button></form>
		<h2 style="margin-top:32px">2. Set business details</h2>
		<p>Phone, email, address, rating, social links, lead notification email, webhook and Google Tag Manager ID live in <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[panel]=o1g' ) ); ?>">Customizer → Ocean1Gutters Settings</a>. Upload real job photos under <strong>Photos</strong> to replace the illustrated placeholders.</p>
		<h2>3. Leads</h2>
		<p>Every form submission lands in <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=o1g_lead' ) ); ?>">Leads</a> and is emailed to the lead address. For reliable email delivery on Hostinger, install an SMTP plugin (e.g. WP Mail SMTP) and use a mailbox on your domain.</p>
		<h2>4. SEO</h2>
		<p>Titles, meta descriptions, canonical tags, Open Graph and JSON-LD schema (LocalBusiness, Service, FAQ, Breadcrumb, BlogPosting) are built in. If you install Yoast or Rank Math the theme steps aside automatically. Sitemap: <a href="<?php echo esc_url( home_url( '/wp-sitemap.xml' ) ); ?>" target="_blank"><?php echo esc_html( home_url( '/wp-sitemap.xml' ) ); ?></a>. Submit it in Google Search Console.</p>
	</div></div>
	<?php
}

function o1g_upsert_page( array $a ): int {
	$slug = $a['slug']; $parent = $a['parent'] ?? 0;
	$existing = get_page_by_path( $parent ? get_post_field( 'post_name', $parent ) . '/' . $slug : $slug );
	$data = [ 'post_type' => 'page', 'post_status' => 'publish', 'post_title' => $a['title'], 'post_name' => $slug, 'post_parent' => $parent, 'post_content' => $a['content'] ?? '', 'menu_order' => $a['order'] ?? 0 ];
	if ( $existing ) { $data['ID'] = $existing->ID; $id = wp_update_post( $data ); } else { $id = wp_insert_post( $data ); }
	if ( ! empty( $a['template'] ) ) { update_post_meta( $id, '_wp_page_template', $a['template'] ); }
	if ( ! empty( $a['partial'] ) ) { update_post_meta( $id, '_o1g_partial', $a['partial'] ); $m = o1g_partial_meta( $a['partial'] ); if ( $m ) { update_post_meta( $id, '_o1g_meta_title', $m['title'] ); update_post_meta( $id, '_o1g_meta_description', $m['description'] ); } }
	return (int) $id;
}

function o1g_install_content(): array {
	$c = o1g_content(); $log = [];
	$T = 'template-designed.php';

	$home = o1g_upsert_page( [ 'slug' => 'home', 'title' => 'Home', 'template' => $T, 'partial' => 'home' ] );
	$blog = o1g_upsert_page( [ 'slug' => 'blog', 'title' => 'Blog' ] );
	$services = o1g_upsert_page( [ 'slug' => 'services', 'title' => 'Services', 'template' => $T, 'partial' => 'services-index', 'order' => 1 ] );
	foreach ( $c['services'] as $i => $s ) { o1g_upsert_page( [ 'slug' => $s['slug'], 'title' => $s['name'], 'parent' => $services, 'template' => $T, 'partial' => 'service-' . $s['slug'], 'order' => $i ] ); }
	$areas = o1g_upsert_page( [ 'slug' => 'service-areas', 'title' => 'Service Areas', 'template' => $T, 'partial' => 'areas-index', 'order' => 2 ] );
	foreach ( $c['cities'] as $i => $ct ) { o1g_upsert_page( [ 'slug' => 'gutters-' . $ct['slug'] . '-fl', 'title' => 'Seamless Gutters in ' . $ct['name'] . ', FL', 'template' => $T, 'partial' => 'city-' . $ct['slug'], 'order' => $i ] ); }
	$about = o1g_upsert_page( [ 'slug' => 'about', 'title' => 'About Us', 'template' => $T, 'partial' => 'about', 'order' => 3 ] );
	$contact = o1g_upsert_page( [ 'slug' => 'contact', 'title' => 'Contact', 'template' => $T, 'partial' => 'contact', 'order' => 5 ] );
	o1g_upsert_page( [ 'slug' => 'thank-you', 'title' => 'Thank You', 'template' => $T, 'partial' => 'thank-you' ] );
	o1g_upsert_page( [ 'slug' => 'privacy', 'title' => 'Privacy Policy', 'content' => '<p>' . esc_html( $c['business']['legalName'] ) . ' collects the information you submit through forms on this site (name, phone, email, address, project details) solely to respond to your request and provide gutter services. We do not sell your information. We may use analytics tools that collect anonymized usage data. By submitting a form you consent to be contacted by phone, text or email about your request. To have your data removed, email ' . esc_html( $c['business']['email'] ) . '.</p>' ] );
	$log[] = 'Pages created/updated: ' . ( 8 + count( $c['services'] ) + count( $c['cities'] ) );
	// Remove designed pages whose layout no longer exists (e.g. a city dropped from the service area).
	foreach ( get_posts( [ 'post_type' => 'page', 'numberposts' => -1, 'meta_key' => '_o1g_partial', 'fields' => 'ids' ] ) as $pid ) {
		$partial = get_post_meta( $pid, '_o1g_partial', true );
		if ( $partial && ! file_exists( O1G_DIR . '/inc/partials/' . basename( $partial ) . '.html' ) ) { wp_delete_post( $pid, true ); $log[] = 'Removed stale page: ' . $partial; }
	}
	// Remove WordPress sample content.
	if ( $sp = get_page_by_path( 'sample-page' ) ) { wp_delete_post( $sp->ID, true ); }
	if ( $hw = get_page_by_path( 'hello-world', OBJECT, 'post' ) ) { wp_delete_post( $hw->ID, true ); }

	update_option( 'show_on_front', 'page' ); update_option( 'page_on_front', $home ); update_option( 'page_for_posts', $blog );
	update_option( 'blogname', $c['business']['name'] ); update_option( 'blogdescription', $c['business']['tagline'] );
	$log[] = 'Front page + blog page set';

	// Blog posts.
	$cat = get_cat_ID( 'Gutter Tips' ) ?: wp_create_category( 'Gutter Tips' );
	foreach ( $c['posts'] as $p ) {
		$existing = get_page_by_path( $p['slug'], OBJECT, 'post' );
		$body = preg_replace( '/href="\/([^"]*)"/', 'href="' . untrailingslashit( home_url() ) . '/$1"', $p['body'] );
		$data = [ 'post_type' => 'post', 'post_status' => 'publish', 'post_title' => $p['title'], 'post_name' => $p['slug'], 'post_content' => $body, 'post_excerpt' => $p['excerpt'], 'post_date' => $p['date'] . ' 09:00:00', 'post_category' => [ $cat ] ];
		if ( $existing ) { $data['ID'] = $existing->ID; $id = wp_update_post( $data ); } else { $id = wp_insert_post( $data ); }
		update_post_meta( $id, '_o1g_meta_description', $p['description'] );
	}
	$log[] = 'Blog posts: ' . count( $c['posts'] );

	// Menu.
	$menu_id = wp_get_nav_menu_object( 'Primary' ) ? wp_get_nav_menu_object( 'Primary' )->term_id : wp_create_nav_menu( 'Primary' );
	foreach ( wp_get_nav_menu_items( $menu_id ) ?: [] as $it ) { wp_delete_post( $it->ID, true ); }
	$add = fn( $title, $object_id, $parent = 0, $url = '' ) => wp_update_nav_menu_item( $menu_id, 0, $url ? [ 'menu-item-title' => $title, 'menu-item-url' => $url, 'menu-item-status' => 'publish', 'menu-item-parent-id' => $parent ] : [ 'menu-item-title' => $title, 'menu-item-object' => 'page', 'menu-item-object-id' => $object_id, 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish', 'menu-item-parent-id' => $parent ] );
	$m_services = $add( 'Services', $services );
	foreach ( $c['services'] as $s ) { $pg = get_page_by_path( 'services/' . $s['slug'] ); if ( $pg ) { $add( $s['name'], $pg->ID, $m_services ); } }
	$m_areas = $add( 'Service Areas', $areas );
	foreach ( $c['cities'] as $ct ) { $pg = get_page_by_path( 'gutters-' . $ct['slug'] . '-fl' ); if ( $pg ) { $add( $ct['name'], $pg->ID, $m_areas ); } }
	$add( 'Why Us', $about );
	$add( 'Reviews', 0, 0, home_url( '/#reviews' ) );
	$add( 'Blog', $blog );
	$add( 'Contact', $contact );
	$locations = get_theme_mod( 'nav_menu_locations', [] ); $locations['primary'] = $menu_id; set_theme_mod( 'nav_menu_locations', $locations );
	$log[] = 'Primary menu built and assigned';

	// Permalinks → /blog/%postname%/ so post URLs match the static site.
	global $wp_rewrite; $wp_rewrite->set_permalink_structure( '/blog/%postname%/' ); flush_rewrite_rules();
	update_option( 'o1g_installed', time() );
	$log[] = 'Permalinks set to /blog/%postname%/ and flushed';
	return $log;
}
