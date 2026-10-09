<?php
defined( 'ABSPATH' ) || exit;
get_header();
$contact = get_page_by_path( 'contact' ); $services = get_page_by_path( 'services' );
?>
<section class="section thanks notfound" style="padding-top:calc(var(--header-h) + 48px)"><div class="container"><h1>404</h1><h2>That page washed away.</h2><p class="lead">Try one of these instead.</p>
<p><a class="btn btn--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> <a class="btn btn--outline" href="<?php echo esc_url( $services ? get_permalink( $services ) : home_url( '/' ) ); ?>">Services</a> <a class="btn btn--outline" href="<?php echo esc_url( $contact ? get_permalink( $contact ) : home_url( '/' ) ); ?>">Free Estimate</a></p></div></section>
<?php get_footer();
