<?php
/**
 * SEO: titles, meta description, canonical, Open Graph, JSON-LD schema.
 * Steps aside automatically if Yoast, Rank Math, SEOPress or AIOSEO is active.
 */
defined( 'ABSPATH' ) || exit;

function o1g_seo_plugin_active(): bool {
	return defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) || defined( 'SEOPRESS_VERSION' ) || defined( 'AIOSEO_VERSION' );
}

function o1g_meta_description(): string {
	if ( is_front_page() ) { return o1g_partial_meta( 'home' )['description'] ?? get_bloginfo( 'description' ); }
	if ( is_singular() ) {
		$id = get_the_ID();
		$m = get_post_meta( $id, '_o1g_meta_description', true );
		if ( $m ) { return $m; }
		if ( $p = o1g_page_partial( $id ) ) { $d = o1g_partial_meta( $p )['description'] ?? ''; if ( $d ) { return $d; } }
		return wp_strip_all_tags( get_the_excerpt( $id ) );
	}
	if ( is_home() ) { return 'Straight answers on gutter cost, gutter guards, cleaning schedules and storm prep for Palm Beach County homeowners.'; }
	return get_bloginfo( 'description' );
}

add_filter( 'pre_get_document_title', function ( $title ) {
	if ( o1g_seo_plugin_active() ) { return $title; }
	if ( is_front_page() ) { return o1g_partial_meta( 'home' )['title'] ?? $title; }
	if ( is_home() ) { return 'Gutter Tips, Pricing & Advice for South Florida | ' . get_bloginfo( 'name' ) . ' Blog'; }
	if ( is_singular() ) {
		$id = get_the_ID();
		$t = get_post_meta( $id, '_o1g_meta_title', true );
		if ( $t ) { return $t; }
		if ( $p = o1g_page_partial( $id ) ) { $t = o1g_partial_meta( $p )['title'] ?? ''; if ( $t ) { return $t; } }
	}
	return $title;
} );

add_action( 'init', function () { if ( ! o1g_seo_plugin_active() ) { remove_action( 'wp_head', 'rel_canonical' ); } } );

add_action( 'wp_head', function () {
	if ( o1g_seo_plugin_active() ) { return; }
	$desc = o1g_meta_description();
	$url = is_singular() ? get_permalink() : ( is_front_page() ? home_url( '/' ) : ( is_home() ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( add_query_arg( [] ) ) ) );
	$img = ( is_singular() && has_post_thumbnail() ) ? get_the_post_thumbnail_url( null, 'o1g-og' ) : o1g_og_image();
	$noindex = is_404() || is_search() || ( is_page() && in_array( get_post_field( 'post_name' ), [ 'thank-you', 'privacy' ], true ) );
	echo '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
	echo '<meta name="robots" content="' . ( $noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' ) . '">' . "\n";
	if ( ! is_404() ) { echo '<link rel="canonical" href="' . esc_url( $url ) . '">' . "\n"; }
	echo '<meta property="og:type" content="' . ( is_singular( 'post' ) ? 'article' : 'website' ) . '"><meta property="og:site_name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '"><meta property="og:title" content="' . esc_attr( wp_get_document_title() ) . '"><meta property="og:description" content="' . esc_attr( $desc ) . '"><meta property="og:url" content="' . esc_url( $url ) . '"><meta property="og:image" content="' . esc_url( $img ) . '"><meta name="twitter:card" content="summary_large_image">' . "\n";
	echo '<meta name="geo.region" content="US-FL"><meta name="geo.placename" content="' . esc_attr( o1g_opt( 'city' ) ) . '">' . "\n";
	echo '<link rel="icon" href="' . esc_url( O1G_URI . '/assets/img/logo.svg' ) . '" type="image/svg+xml">' . "\n";
	o1g_schema();
}, 2 );

function o1g_schema(): void {
	$c = o1g_content(); $b = $c['business'];
	$home = home_url( '/' );
	$biz_id = $home . '#business';
	$graph = [];

	$business = [
		'@type' => [ 'HomeAndConstructionBusiness', 'LocalBusiness' ], '@id' => $biz_id,
		'name' => get_bloginfo( 'name' ), 'legalName' => o1g_opt( 'legal_name' ), 'url' => $home, 'telephone' => o1g_opt( 'phone_raw' ), 'email' => o1g_opt( 'email' ),
		'image' => o1g_og_image(), 'logo' => O1G_URI . '/assets/img/logo.svg',
		'description' => 'Seamless gutter installation, gutter repair, gutter cleaning and gutter guards in Palm Beach County, Florida.',
		'foundingDate' => o1g_opt( 'founded' ), 'priceRange' => '$$',
		'address' => [ '@type' => 'PostalAddress', 'streetAddress' => o1g_opt( 'street' ), 'addressLocality' => o1g_opt( 'city' ), 'addressRegion' => o1g_opt( 'state' ), 'postalCode' => o1g_opt( 'zip' ), 'addressCountry' => 'US' ],
		'geo' => [ '@type' => 'GeoCoordinates', 'latitude' => $b['geo']['lat'], 'longitude' => $b['geo']['lng'] ],
		'areaServed' => array_map( fn( $ct ) => [ '@type' => 'City', 'name' => $ct['name'] . ', FL' ], $c['cities'] ),
		'openingHoursSpecification' => [
			[ '@type' => 'OpeningHoursSpecification', 'dayOfWeek' => [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ], 'opens' => '07:00', 'closes' => '18:00' ],
			[ '@type' => 'OpeningHoursSpecification', 'dayOfWeek' => [ 'Saturday' ], 'opens' => '08:00', 'closes' => '16:00' ],
		],
		'sameAs' => array_values( array_filter( [ o1g_opt( 'facebook' ), o1g_opt( 'instagram' ), o1g_opt( 'google' ), o1g_opt( 'yelp' ) ] ) ),
		'aggregateRating' => [ '@type' => 'AggregateRating', 'ratingValue' => o1g_opt( 'rating' ), 'reviewCount' => o1g_opt( 'rating_count' ), 'bestRating' => '5' ],
	];

	if ( is_front_page() ) {
		$graph[] = $business;
		$graph[] = [ '@type' => 'WebSite', '@id' => $home . '#website', 'url' => $home, 'name' => get_bloginfo( 'name' ), 'publisher' => [ '@id' => $biz_id ] ];
		$graph[] = o1g_faq_schema( $c['homeFaqs'] );
	} elseif ( is_page() ) {
		$id = get_the_ID(); $partial = o1g_page_partial( $id );
		$crumbs = [ [ 'Home', $home ] ];
		if ( $parent = wp_get_post_parent_id( $id ) ) { $crumbs[] = [ get_the_title( $parent ), get_permalink( $parent ) ]; }
		elseif ( str_starts_with( $partial, 'city-' ) && ( $sa = get_page_by_path( 'service-areas' ) ) ) { $crumbs[] = [ 'Service Areas', get_permalink( $sa ) ]; }
		$crumbs[] = [ get_the_title( $id ), get_permalink( $id ) ];
		$graph[] = o1g_breadcrumb_schema( $crumbs );
		if ( str_starts_with( $partial, 'service-' ) ) {
			$slug = substr( $partial, 8 );
			foreach ( $c['services'] as $s ) { if ( $s['slug'] === $slug ) {
				$graph[] = [ '@type' => 'Service', 'name' => $s['name'], 'serviceType' => $s['name'], 'description' => $s['description'], 'provider' => [ '@id' => $biz_id ], 'url' => get_permalink( $id ), 'areaServed' => array_map( fn( $ct ) => [ '@type' => 'City', 'name' => $ct['name'] . ', FL' ], $c['cities'] ) ];
				$graph[] = o1g_faq_schema( $s['faqs'] );
			} }
		} elseif ( str_starts_with( $partial, 'city-' ) ) {
			$slug = substr( $partial, 5 );
			foreach ( $c['cities'] as $ct ) { if ( $ct['slug'] === $slug ) {
				$graph[] = [ '@type' => 'Service', 'name' => "Gutter Services in {$ct['name']}, FL", 'serviceType' => 'Seamless gutter installation, repair, cleaning and gutter guards', 'provider' => [ '@id' => $biz_id ], 'url' => get_permalink( $id ), 'areaServed' => [ '@type' => 'City', 'name' => $ct['name'], 'containedInPlace' => [ '@type' => 'AdministrativeArea', 'name' => 'Palm Beach County, FL' ] ] ];
			} }
		} elseif ( $partial === 'contact' ) { $graph[] = [ '@type' => 'ContactPage', 'url' => get_permalink( $id ), 'mainEntity' => [ '@id' => $biz_id ] ]; }
		elseif ( $partial === 'about' ) { $graph[] = [ '@type' => 'AboutPage', 'url' => get_permalink( $id ), 'mainEntity' => [ '@id' => $biz_id ] ]; }
		$graph[] = [ '@type' => 'LocalBusiness', '@id' => $biz_id, 'name' => get_bloginfo( 'name' ), 'url' => $home, 'telephone' => o1g_opt( 'phone_raw' ) ];
	} elseif ( is_singular( 'post' ) ) {
		$graph[] = o1g_breadcrumb_schema( [ [ 'Home', $home ], [ 'Blog', get_permalink( get_option( 'page_for_posts' ) ) ], [ get_the_title(), get_permalink() ] ] );
		$graph[] = [ '@type' => 'BlogPosting', 'headline' => get_the_title(), 'description' => o1g_meta_description(), 'datePublished' => get_the_date( 'c' ), 'dateModified' => get_the_modified_date( 'c' ), 'author' => [ '@type' => 'Organization', 'name' => get_bloginfo( 'name' ) ], 'publisher' => [ '@id' => $biz_id ], 'mainEntityOfPage' => get_permalink(), 'image' => has_post_thumbnail() ? get_the_post_thumbnail_url( null, 'o1g-og' ) : o1g_og_image() ];
		$graph[] = [ '@type' => 'LocalBusiness', '@id' => $biz_id, 'name' => get_bloginfo( 'name' ), 'url' => $home, 'telephone' => o1g_opt( 'phone_raw' ) ];
	}
	if ( $graph ) { echo '<script type="application/ld+json">' . wp_json_encode( [ '@context' => 'https://schema.org', '@graph' => $graph ], JSON_UNESCAPED_SLASHES ) . '</script>' . "\n"; }
}

function o1g_faq_schema( array $faqs ): array {
	return [ '@type' => 'FAQPage', 'mainEntity' => array_map( fn( $f ) => [ '@type' => 'Question', 'name' => $f['q'], 'acceptedAnswer' => [ '@type' => 'Answer', 'text' => $f['a'] ] ], $faqs ) ];
}
function o1g_breadcrumb_schema( array $items ): array {
	$list = []; foreach ( $items as $i => $c ) { $list[] = [ '@type' => 'ListItem', 'position' => $i + 1, 'name' => $c[0], 'item' => $c[1] ]; }
	return [ '@type' => 'BreadcrumbList', 'itemListElement' => $list ];
}

// Sitemap: WordPress core sitemap is at /wp-sitemap.xml. Exclude leads + thank-you.
add_filter( 'wp_sitemaps_post_types', function ( $types ) { unset( $types['o1g_lead'] ); return $types; } );
add_filter( 'wp_sitemaps_posts_query_args', function ( $args, $type ) {
	if ( $type === 'page' ) { $ids = array_filter( [ get_page_by_path( 'thank-you' )->ID ?? 0, get_page_by_path( 'privacy' )->ID ?? 0 ] ); if ( $ids ) { $args['post__not_in'] = $ids; } }
	return $args;
}, 10, 2 );

function o1g_og_image(): string {
	return file_exists( O1G_DIR . '/assets/img/og-default.jpg' ) ? O1G_URI . '/assets/img/og-default.jpg' : O1G_URI . '/assets/img/og-default.svg';
}
