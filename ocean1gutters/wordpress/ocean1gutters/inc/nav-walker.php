<?php
/**
 * Nav walkers that output the theme's dropdown + drawer markup.
 */
defined( 'ABSPATH' ) || exit;

class O1G_Nav_Walker extends Walker_Nav_Menu {
	public function start_lvl( &$output, $depth = 0, $args = null ) { $output .= '<ul class="nav__menu">'; }
	public function end_lvl( &$output, $depth = 0, $args = null ) { $output .= '</ul>'; }
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$has = in_array( 'menu-item-has-children', (array) $item->classes, true );
		$url = esc_url( $item->url ); $title = esc_html( $item->title );
		if ( $depth === 0 ) {
			$output .= $has
				? '<li class="nav__item nav__item--has-menu"><a class="nav__link" href="' . $url . '" aria-expanded="false" aria-haspopup="true">' . $title . ' ' . o1g_icon( 'chevron' ) . '</a>'
				: '<li class="nav__item"><a class="nav__link" href="' . $url . '">' . $title . '</a>';
		} else {
			$output .= '<li><a href="' . $url . '">' . $title . '</a>';
		}
	}
	public function end_el( &$output, $item, $depth = 0, $args = null ) { $output .= '</li>'; }
}

class O1G_Drawer_Walker extends Walker_Nav_Menu {
	public function start_lvl( &$output, $depth = 0, $args = null ) { $output .= '<ul class="drawer__sub">'; }
	public function end_lvl( &$output, $depth = 0, $args = null ) { $output .= '</ul>'; }
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$has = in_array( 'menu-item-has-children', (array) $item->classes, true );
		$url = esc_url( $item->url ); $title = esc_html( $item->title );
		if ( $depth === 0 ) {
			$output .= $has
				? '<div class="drawer__group"><button type="button" aria-expanded="false">' . $title . ' ' . o1g_icon( 'chevron' ) . '</button>'
				: '<div class="drawer__group"><a href="' . $url . '">' . $title . '</a>';
		} else {
			$output .= '<li><a href="' . $url . '">' . $title . '</a>';
		}
	}
	public function end_el( &$output, $item, $depth = 0, $args = null ) { $output .= $depth === 0 ? '</div>' : '</li>'; }
}

/** Fallback nav built from content.json when no WP menu is assigned. */
function o1g_fallback_nav( string $mode = 'desktop' ): string {
	$nav = o1g_content()['nav'] ?? [];
	$out = '';
	foreach ( $nav as $n ) {
		$href = esc_url( home_url( $n['href'] ) );
		if ( ! empty( $n['children'] ) ) {
			$kids = '';
			foreach ( $n['children'] as $k ) { $kids .= '<li><a href="' . esc_url( home_url( $k['href'] ) ) . '">' . esc_html( $k['label'] ) . '</a></li>'; }
			$out .= $mode === 'desktop'
				? '<li class="nav__item nav__item--has-menu"><a class="nav__link" href="' . $href . '" aria-expanded="false" aria-haspopup="true">' . esc_html( $n['label'] ) . ' ' . o1g_icon( 'chevron' ) . '</a><ul class="nav__menu' . ( count( $n['children'] ) > 6 ? ' nav__menu--wide' : '' ) . '">' . $kids . '</ul></li>'
				: '<div class="drawer__group"><button type="button" aria-expanded="false">' . esc_html( $n['label'] ) . ' ' . o1g_icon( 'chevron' ) . '</button><ul class="drawer__sub"><li><a href="' . $href . '">All ' . esc_html( $n['label'] ) . '</a></li>' . $kids . '</ul></div>';
		} else {
			$out .= $mode === 'desktop' ? '<li class="nav__item"><a class="nav__link" href="' . $href . '">' . esc_html( $n['label'] ) . '</a></li>' : '<div class="drawer__group"><a href="' . $href . '">' . esc_html( $n['label'] ) . '</a></div>';
		}
	}
	return $out;
}
