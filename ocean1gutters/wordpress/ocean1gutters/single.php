<?php
defined( 'ABSPATH' ) || exit;
get_header();
$blog_url = get_option( 'page_for_posts' ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
while ( have_posts() ) : the_post();
	echo o1g_page_hero( get_the_title(), has_excerpt() ? get_the_excerpt() : '', get_the_date( 'F j, Y' ), o1g_crumbs( [ [ 'Home', home_url( '/' ) ], [ 'Blog', $blog_url ], [ get_the_title(), get_permalink() ] ] ), false );
	?>
	<section class="section"><div class="container with-aside">
		<article class="content">
			<?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'large', [ 'loading' => 'eager', 'style' => 'margin-bottom:24px' ] ); } the_content(); ?>
			<hr style="border:0;border-top:1px solid var(--line);margin:32px 0">
			<p><strong>About the author:</strong> <?php bloginfo( 'name' ); ?> is a family-owned seamless gutter company in <?php echo esc_html( o1g_opt( 'city' ) ); ?>, FL, serving Palm Beach County since <?php echo esc_html( o1g_opt( 'founded' ) ); ?>. <a href="<?php echo esc_url( ( $c = get_page_by_path( 'contact' ) ) ? get_permalink( $c ) : home_url( '/contact/' ) ); ?>">Request a free estimate</a>.</p>
		</article>
		<?php echo o1g_contact_aside(); ?>
	</div></section>
	<?php
	$related = new WP_Query( [ 'post__not_in' => [ get_the_ID() ], 'posts_per_page' => 3, 'ignore_sticky_posts' => true ] );
	if ( $related->have_posts() ) {
		echo '<section class="section section--alt"><div class="container"><h2 class="text-center">More Gutter Tips</h2><div class="grid grid-3">';
		while ( $related->have_posts() ) { $related->the_post(); echo '<a class="post-card" href="' . esc_url( get_permalink() ) . '"><div class="post-card__body"><h3>' . esc_html( get_the_title() ) . '</h3><p>' . esc_html( wp_strip_all_tags( get_the_excerpt() ) ) . '</p></div></a>'; }
		echo '</div></div></section>'; wp_reset_postdata();
	}
	echo o1g_cta_band();
endwhile;
get_footer();
