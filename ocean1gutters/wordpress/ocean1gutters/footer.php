<?php
defined( 'ABSPATH' ) || exit;
$c = o1g_content();
$contact = get_page_by_path( 'contact' ); $contact_url = $contact ? get_permalink( $contact ) : home_url( '/contact/' );
$blog_url = get_option( 'page_for_posts' ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/blog/' );
?>
</main>
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo str_replace( [ 'id="lg"', 'url(#lg)' ], [ 'id="lgf"', 'url(#lgf)' ], o1g_icon( 'logo' ) ); ?><span>Ocean<em>1</em>Gutters</span></a>
        <p style="margin-top:16px">Seamless gutter installation, repair, cleaning and gutter guards for homes and businesses across Palm Beach County. <?php echo esc_html( o1g_opt( 'license' ) ); ?>. Serving South Florida since <?php echo esc_html( o1g_opt( 'founded' ) ); ?>.</p>
        <div class="social">
          <?php foreach ( [ 'facebook' => 'Facebook', 'instagram' => 'Instagram', 'google' => 'Google Reviews', 'yelp' => 'Yelp' ] as $k => $label ) { if ( $u = o1g_opt( $k ) ) { echo '<a href="' . esc_url( $u ) . '" aria-label="' . esc_attr( $label ) . '" rel="noopener" target="_blank">' . o1g_icon( $k ) . '</a>'; } } ?>
        </div>
      </div>
      <div><h4>Services</h4><ul>
        <?php foreach ( $c['services'] as $s ) { $pg = get_page_by_path( 'services/' . $s['slug'] ); echo '<li><a href="' . esc_url( $pg ? get_permalink( $pg ) : home_url( '/services/' . $s['slug'] . '/' ) ) . '">' . esc_html( $s['name'] ) . '</a></li>'; } ?>
        <li><a href="<?php echo esc_url( $blog_url ); ?>">Gutter Tips &amp; Pricing</a></li>
      </ul></div>
      <div><h4>Service Areas</h4><ul>
        <?php foreach ( $c['cities'] as $ct ) { $pg = get_page_by_path( 'gutters-' . $ct['slug'] . '-fl' ); echo '<li><a href="' . esc_url( $pg ? get_permalink( $pg ) : home_url( '/gutters-' . $ct['slug'] . '-fl/' ) ) . '">' . esc_html( $ct['name'] ) . ', FL</a></li>'; } ?>
      </ul></div>
      <div><h4>Contact</h4><ul class="footer__contact">
        <li><?php echo o1g_icon( 'phone' ); ?><a href="tel:<?php echo esc_attr( o1g_opt( 'phone_raw' ) ); ?>"><?php echo esc_html( o1g_opt( 'phone' ) ); ?></a></li>
        <li><?php echo o1g_icon( 'whatsapp' ); ?><a href="https://wa.me/<?php echo esc_attr( o1g_opt( 'whatsapp' ) ); ?>" rel="noopener">WhatsApp</a></li>
        <li><?php echo o1g_icon( 'mail' ); ?><a href="mailto:<?php echo esc_attr( o1g_opt( 'email' ) ); ?>"><?php echo esc_html( o1g_opt( 'email' ) ); ?></a></li>
        <li><?php echo o1g_icon( 'pin' ); ?><span><?php echo esc_html( o1g_opt( 'street' ) ); ?><br><?php echo esc_html( o1g_opt( 'city' ) . ', ' . o1g_opt( 'state' ) . ' ' . o1g_opt( 'zip' ) ); ?></span></li>
        <li><?php echo o1g_icon( 'clock' ); ?><span>Mon–Fri 7am–6pm<br>Sat 8am–4pm</span></li>
      </ul></div>
    </div>
    <div class="footer__bottom">
      <span>© <?php echo esc_html( date( 'Y' ) ); ?> <?php echo esc_html( o1g_opt( 'legal_name' ) ); ?>. All rights reserved. <?php echo esc_html( o1g_opt( 'license' ) ); ?>.</span>
      <span><?php $pp = get_page_by_path( 'privacy' ); if ( $pp ) { echo '<a href="' . esc_url( get_permalink( $pp ) ) . '">Privacy</a> · '; } ?><a href="<?php echo esc_url( home_url( '/wp-sitemap.xml' ) ); ?>">Sitemap</a></span>
    </div>
  </div>
</footer>
<div class="sticky-cta" aria-label="Quick contact">
  <a class="btn btn--navy" href="tel:<?php echo esc_attr( o1g_opt( 'phone_raw' ) ); ?>"><?php echo o1g_icon( 'phone' ); ?> Call Now</a>
  <a class="btn btn--primary" href="<?php echo esc_url( $contact_url ); ?>">Free Estimate</a>
</div>
<?php wp_footer(); ?>
</body>
</html>
