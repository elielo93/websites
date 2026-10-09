<?php
defined( 'ABSPATH' ) || exit;
$o1g_solid = ! ( is_front_page() || is_singular( 'post' ) || is_home() || ( is_page() && o1g_page_partial() ) );
if ( is_page() && ( $o1g_p = o1g_page_partial() ) ) { $o1g_solid = ! empty( o1g_partial_meta( $o1g_p )['solid'] ); }
$o1g_logo  = '<a class="logo" href="' . esc_url( home_url( '/' ) ) . '" aria-label="' . esc_attr( get_bloginfo( 'name' ) ) . ' home">' . o1g_icon( 'logo' ) . '<span>Ocean<em>1</em>Gutters</span></a>';
$o1g_contact = get_page_by_path( 'contact' ); $o1g_contact_url = $o1g_contact ? get_permalink( $o1g_contact ) : home_url( '/contact/' );
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php if ( $gtm = o1g_opt( 'gtm_id' ) ) : ?><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo esc_attr( $gtm ); ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><?php endif; ?>
<a class="skip-link" href="#main">Skip to content</a>
<header class="header<?php echo $o1g_solid ? ' header--solid' : ''; ?>">
  <div class="container header__inner">
    <?php echo $o1g_logo; ?>
    <nav class="nav" aria-label="Primary"><ul style="display:contents;list-style:none;margin:0;padding:0">
      <?php if ( has_nav_menu( 'primary' ) ) { wp_nav_menu( [ 'theme_location' => 'primary', 'container' => false, 'items_wrap' => '%3$s', 'walker' => new O1G_Nav_Walker(), 'depth' => 2, 'echo' => true ] ); } else { echo o1g_fallback_nav( 'desktop' ); } ?>
    </ul></nav>
    <div style="display:flex;align-items:center;gap:8px">
      <a class="header__phone" href="tel:<?php echo esc_attr( o1g_opt( 'phone_raw' ) ); ?>"><?php echo o1g_icon( 'phone' ); ?> <?php echo esc_html( o1g_opt( 'phone' ) ); ?></a>
      <a class="btn btn--primary btn--sm header__cta" href="<?php echo esc_url( $o1g_contact_url ); ?>">Free Estimate</a>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer">
  <?php if ( has_nav_menu( 'primary' ) ) { wp_nav_menu( [ 'theme_location' => 'primary', 'container' => false, 'items_wrap' => '%3$s', 'walker' => new O1G_Drawer_Walker(), 'depth' => 2 ] ); } else { echo o1g_fallback_nav( 'drawer' ); } ?>
  <div class="drawer__cta">
    <a class="btn btn--primary btn--lg" href="<?php echo esc_url( $o1g_contact_url ); ?>">Get a Free Estimate</a>
    <a class="btn btn--ghost-light" href="tel:<?php echo esc_attr( o1g_opt( 'phone_raw' ) ); ?>"><?php echo o1g_icon( 'phone' ); ?> Call <?php echo esc_html( o1g_opt( 'phone' ) ); ?></a>
    <a class="btn btn--whatsapp" href="https://wa.me/<?php echo esc_attr( o1g_opt( 'whatsapp' ) ); ?>?text=Hi%20Ocean1Gutters%2C%20I%27d%20like%20a%20free%20gutter%20estimate."><?php echo o1g_icon( 'whatsapp' ); ?> WhatsApp Us</a>
  </div>
</div>
<main id="main">
