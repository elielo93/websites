<?php
defined( 'ABSPATH' ) || exit;
get_header();
if ( o1g_page_partial() ) { echo o1g_partial( o1g_page_partial() ); } else { get_template_part( 'template-parts/page-default' ); }
get_footer();
