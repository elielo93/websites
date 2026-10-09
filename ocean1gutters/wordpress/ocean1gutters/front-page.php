<?php
defined( 'ABSPATH' ) || exit;
get_header();
echo o1g_partial( 'home' );
if ( is_page() && trim( get_post_field( 'post_content' ) ) !== '' ) {
	echo '<section class="section"><div class="container content">';
	while ( have_posts() ) { the_post(); the_content(); }
	echo '</div></section>';
}
get_footer();
