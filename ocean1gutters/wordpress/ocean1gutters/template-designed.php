<?php
/**
 * Template Name: Ocean1 Designed Page
 * Description: Renders the designed layout exported from the site builder (home, services, cities, about, contact, thank-you). Any content you add in the editor appears below the designed sections.
 */
defined( 'ABSPATH' ) || exit;
get_header();
$partial = o1g_page_partial();
if ( $partial ) {
	echo o1g_partial( $partial );
	if ( trim( get_post_field( 'post_content' ) ) !== '' ) {
		echo '<section class="section"><div class="container content">';
		while ( have_posts() ) { the_post(); the_content(); }
		echo '</div></section>';
	}
} else {
	get_template_part( 'template-parts/page-default' );
}
get_footer();
