<?php
defined( 'ABSPATH' ) || exit;
while ( have_posts() ) : the_post();
	$crumbs = [ [ 'Home', home_url( '/' ) ] ];
	if ( $parent = wp_get_post_parent_id( get_the_ID() ) ) { $crumbs[] = [ get_the_title( $parent ), get_permalink( $parent ) ]; }
	$crumbs[] = [ get_the_title(), get_permalink() ];
	echo o1g_page_hero( get_the_title(), has_excerpt() ? get_the_excerpt() : '', '', o1g_crumbs( $crumbs ), ! in_array( get_post_field( 'post_name' ), [ 'privacy' ], true ) );
	?>
	<section class="section"><div class="container with-aside">
		<article class="content"><?php the_content(); if ( has_post_thumbnail() ) {} ?></article>
		<?php echo o1g_contact_aside(); ?>
	</div></section>
	<?php echo o1g_cta_band();
endwhile;
