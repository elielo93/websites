<?php
/**
 * Ocean1Gutters lead handler for static hosting (Hostinger shared hosting, PHP 7.4+).
 * - Validates + sanitizes the form
 * - Blocks bots (honeypot, timing, rate limit)
 * - Emails the lead, appends to a CSV log, optionally POSTs to a webhook (Zapier / Make / CRM)
 * - Returns JSON for the fetch() front-end, or redirects for no-JS submissions
 *
 * Configure by copying config.sample.php → config.php (never commit config.php).
 */
declare(strict_types=1);
header('X-Content-Type-Options: nosniff');

$config = [
    'to'            => 'info@ocean1gutters.com',   // where leads are sent
    'from'          => 'leads@ocean1gutters.com',  // must be a mailbox on your domain for Hostinger to deliver
    'subject'       => 'New website lead',
    'webhook'       => '',                          // optional: Zapier/Make/GoHighLevel webhook URL
    'log'           => __DIR__ . '/../leads-log.csv', // outside public_html if possible
    'thanks'        => '/thank-you/',
    'rate_limit'    => 5,                            // max submissions per IP per hour
];
if (file_exists(__DIR__ . '/config.php')) {
    $config = array_merge($config, (array) include __DIR__ . '/config.php');
}

$isFetch = ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch';
function respond(array $payload, int $code = 200): void
{
    global $isFetch, $config;
    http_response_code($code);
    if ($isFetch) {
        header('Content-Type: application/json');
        echo json_encode($payload);
    } else {
        header('Location: ' . (($payload['ok'] ?? false) ? $config['thanks'] : '/contact/?error=1'));
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['ok' => false, 'error' => 'Method not allowed'], 405);
}

// --- Bot checks
if (!empty($_POST['website'])) { respond(['ok' => true, 'redirect' => $config['thanks']]); } // honeypot: pretend success
$ts = (int) ($_POST['ts'] ?? 0);
if ($ts && (microtime(true) * 1000 - $ts) < 1500) { respond(['ok' => false, 'error' => 'Too fast'], 429); }

// --- Rate limit (file-based, per IP, per hour)
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rlFile = sys_get_temp_dir() . '/o1g_rl_' . md5($ip);
$hits = file_exists($rlFile) && filemtime($rlFile) > time() - 3600 ? (int) file_get_contents($rlFile) : 0;
if ($hits >= (int) $config['rate_limit']) { respond(['ok' => false, 'error' => 'Too many requests'], 429); }
file_put_contents($rlFile, (string) ($hits + 1));

// --- Validate
$clean = fn($k, $max = 500) => mb_substr(trim(strip_tags((string) ($_POST[$k] ?? ''))), 0, $max);
$name = $clean('name', 100);
$phone = $clean('phone', 30);
$email = $clean('email', 150);
$city = $clean('city', 100);
$service = $clean('service', 100);
$message = $clean('message', 2000);
$source = $clean('source', 50);
$pageUrl = $clean('page', 300);
$estimate = $clean('est_summary', 300);
$color = $clean('color_choice', 50);

$errors = [];
if ($name === '') { $errors[] = 'name'; }
if (strlen(preg_replace('/\D/', '', $phone)) < 10) { $errors[] = 'phone'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
if ($errors) { respond(['ok' => false, 'error' => 'Invalid: ' . implode(', ', $errors)], 422); }

// --- Build lead
$lead = [
    'date' => date('Y-m-d H:i:s'), 'name' => $name, 'phone' => $phone, 'email' => $email, 'city' => $city,
    'service' => $service, 'message' => $message, 'estimate' => $estimate, 'color' => $color,
    'source' => $source, 'page' => $pageUrl, 'ip' => $ip,
];

// --- Email
$lines = [];
foreach ($lead as $k => $v) { if ($v !== '') { $lines[] = ucfirst($k) . ': ' . $v; } }
$body = "New lead from ocean1gutters.com\n\n" . implode("\n", $lines) . "\n\nReply fast: speed-to-lead wins the job.";
$headers = "From: Ocean1Gutters Website <{$config['from']}>\r\nReply-To: {$name} <{$email}>\r\nContent-Type: text/plain; charset=UTF-8\r\n";
$sent = @mail($config['to'], "{$config['subject']}: {$name} ({$service}, {$city})", $body, $headers);

// --- CSV log
try {
    $exists = file_exists($config['log']);
    if ($fh = @fopen($config['log'], 'a')) {
        if (!$exists) { fputcsv($fh, array_keys($lead)); }
        fputcsv($fh, $lead);
        fclose($fh);
    }
} catch (Throwable $e) { /* logging is best-effort */ }

// --- Webhook (CRM / Zapier / Make)
if (!empty($config['webhook']) && function_exists('curl_init')) {
    $ch = curl_init($config['webhook']);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => json_encode($lead), CURLOPT_HTTPHEADER => ['Content-Type: application/json'], CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5]);
    curl_exec($ch);
    curl_close($ch);
}

respond(['ok' => true, 'redirect' => $config['thanks'], 'mailed' => (bool) $sent]);
