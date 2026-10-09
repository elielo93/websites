<?php
/** Blog index. */
defined( 'ABSPATH' ) || exit;
get_header();
$blog_url = get_option( 'page_for_posts' ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
echo o1g_page_hero( 'Gutter Advice for South Florida Homeowners', 'Pricing guides, maintenance schedules and honest product reviews from people who hang gutters every day.', 'Blog', o1g_crumbs( [ [ 'Home', home_url( '/' ) ], [ 'Blog', $blog_url ] ] ), false );
?>
<section class="section"><div class="container"><div class="grid grid-3">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<a class="post-card reveal" href="<?php the_permalink(); ?>">
		<div class="post-card__img"><?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'o1g-card', [ 'loading' => 'lazy' ] ); } else { echo o1g_icon( 'doc' ); } ?></div>
		<div class="post-card__body"><span class="post-card__meta"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></span><h3><?php the_title(); ?></h3><p><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p></div>
	</a>
<?php endwhile; else : ?><p>No posts yet.</p><?php endif; ?>
</div><div class="pagination"><?php echo paginate_links( [ 'prev_text' => '‹', 'next_text' => '›' ] ); ?></div></div></section>
<?php echo o1g_cta_band(); get_footer();
