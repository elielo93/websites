<?php
// Copy to config.php next to contact.php and edit. config.php is git-ignored.
return [
    'to'      => 'info@ocean1gutters.com',          // lead notification inbox (can be comma-separated)
    'from'    => 'leads@ocean1gutters.com',         // create this mailbox in Hostinger hPanel → Emails
    'subject' => 'New website lead',
    'webhook' => '',                                 // e.g. https://hooks.zapier.com/hooks/catch/XXXX/YYYY/
    'log'     => __DIR__ . '/../leads-log.csv',     // one directory above public_html
    'thanks'  => '/thank-you/',
];
