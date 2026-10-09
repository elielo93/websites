<?php
/**
 * Ocean1Gutters theme bootstrap.
 */
defined( 'ABSPATH' ) || exit;

define( 'O1G_VERSION', '1.0.0' );
define( 'O1G_DIR', get_template_directory() );
define( 'O1G_URI', get_template_directory_uri() );

require O1G_DIR . '/inc/helpers.php';
require O1G_DIR . '/inc/customizer.php';
require O1G_DIR . '/inc/leads.php';
require O1G_DIR . '/inc/seo.php';
require O1G_DIR . '/inc/nav-walker.php';
require O1G_DIR . '/inc/importer.php';

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', [ 'search-form', 'gallery', 'caption', 'script', 'style' ] );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'custom-logo', [ 'height' => 80, 'width' => 80, 'flex-width' => true ] );
	register_nav_menus( [ 'primary' => __( 'Primary Menu', 'ocean1gutters' ), 'footer' => __( 'Footer Menu', 'ocean1gutters' ) ] );
	add_image_size( 'o1g-card', 800, 450, true );
	add_image_size( 'o1g-og', 1200, 630, true );
} );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'o1g-main', O1G_URI . '/assets/css/main.css', [], O1G_VERSION );
	wp_enqueue_style( 'o1g-theme', get_stylesheet_uri(), [ 'o1g-main' ], O1G_VERSION );
	wp_enqueue_script( 'o1g-main', O1G_URI . '/assets/js/main.js', [], O1G_VERSION, [ 'strategy' => 'defer', 'in_footer' => true ] );
	wp_add_inline_script( 'o1g-main', 'window.O1G=' . wp_json_encode( [
		'phone'    => o1g_opt( 'phone' ),
		'phoneRaw' => o1g_opt( 'phone_raw' ),
		'endpoint' => o1g_form_action(),
		'thanks'   => o1g_thanks_url(),
	] ) . ';', 'before' );
	// Dequeue what we don't use for speed.
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' );
}, 20 );

// Google Font: preconnect + async load (same as static site).
add_action( 'wp_head', function () {
	echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
	echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"></noscript>' . "\n";
	echo '<meta name="theme-color" content="#0b2545">' . "\n";
	if ( $gtm = o1g_opt( 'gtm_id' ) ) {
		printf( "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','%s');</script>\n", esc_js( $gtm ) );
	}
}, 1 );

// Remove bloat.
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
add_filter( 'emoji_svg_url', '__return_false' );
add_filter( 'the_generator', '__return_empty_string' );

// Excerpt tweaks.
add_filter( 'excerpt_length', fn() => 28 );
add_filter( 'excerpt_more', fn() => '…' );

// Body class for designed pages.
add_filter( 'body_class', function ( $classes ) {
	if ( is_page() && get_post_meta( get_the_ID(), '_o1g_partial', true ) ) { $classes[] = 'o1g-designed'; }
	return $classes;
} );

// Flush rewrites on theme switch.
add_action( 'after_switch_theme', function () { o1g_register_lead_cpt(); flush_rewrite_rules(); } );
