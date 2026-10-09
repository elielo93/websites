<?php
/** Generic fallback (archives, search). */
defined( 'ABSPATH' ) || exit;
get_header();
echo o1g_page_hero( is_search() ? 'Search results' : ( get_the_archive_title() ?: 'Blog' ), '', '', o1g_crumbs( [ [ 'Home', home_url( '/' ) ], [ 'Blog', home_url( '/blog/' ) ] ] ), false );
?>
<section class="section"><div class="container"><div class="grid grid-3">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<a class="post-card" href="<?php the_permalink(); ?>"><div class="post-card__body"><span class="post-card__meta"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></span><h3><?php the_title(); ?></h3><p><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p></div></a>
<?php endwhile; else : ?><p>Nothing found.</p><?php endif; ?>
</div><div class="pagination"><?php echo paginate_links(); ?></div></div></section>
<?php echo o1g_cta_band(); get_footer();
