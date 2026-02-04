<?php
// server/feedback.php
// Endpoint: POST JSON { name?, email?, phone?, subject, message, send_channels?: ["email","wa"] }
// Env needed: NOTIFY_EMAIL, XSUN_API_KEY, XSUN_TO, SMTP_* (optional)

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/PHPMailer.php';
require_once __DIR__ . '/whatsapp.php';

try {
  $inputRaw = file_get_contents('php://input');
  $data = json_decode($inputRaw, true);
  if (!is_array($data)) { throw new Exception('Invalid JSON'); }

  $name = trim($data['name'] ?? '');
  $email = trim($data['email'] ?? '');
  $phone = trim($data['phone'] ?? ''); // 62xxxxxxxxxx (opsional)
  $subject = trim($data['subject'] ?? 'Feedback Baru');
  $message = trim($data['message'] ?? '');
  $channels = $data['send_channels'] ?? ['email','wa'];
  // Perkaya subject agar mudah dikenali di inbox
  if ($name || $email) {
    $who = trim(($name ?: '') . ($email ? (" <{$email}>") : ''));
    if ($who) { $subject .= " - {$who}"; }
  }

  if ($message === '') { throw new Exception('Pesan tidak boleh kosong'); }

  // Konten email
  $html = '<h3>Feedback Baru</h3>';
  if ($name)  { $html .= '<p><strong>Nama:</strong> ' . htmlspecialchars($name) . '</p>'; }
  if ($email) { $html .= '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'; }
  if ($phone) { $html .= '<p><strong>Telepon:</strong> ' . htmlspecialchars($phone) . '</p>'; }
  $html .= '<p><strong>Pesan:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>';

  $result = [ 'received' => true, 'email' => null, 'wa' => null ];

  // Kirim Email ke admin
  if (in_array('email', $channels, true)) {
    // Fallback sementara untuk pengujian jika NOTIFY_EMAIL belum diset
    $to = getenv('NOTIFY_EMAIL') ?: 'cdiyunoru@gmail.com';
    if ($to) {
      $result['email'] = sendEmailSMTP($to, $subject, $html);
    } else {
      $result['email'] = ['ok' => false, 'error' => 'NOTIFY_EMAIL not set'];
    }
  }

  // Kirim WA via x-sun ke admin (atau ke nomor user jika diinginkan)
  if (in_array('wa', $channels, true)) {
    $adminTo = getenv('XSUN_TO') ?: '';
    if ($adminTo === '' && $phone !== '') { $adminTo = $phone; } // fallback ke nomor user jika XSUN_TO kosong
    if ($adminTo) {
      $waText = "Feedback Baru\n"
        . ($name ? ("Nama: $name\n") : '')
        . ($email ? ("Email: $email\n") : '')
        . ($phone ? ("Telepon: $phone\n") : '')
        . "Pesan:\n$message";
      $result['wa'] = sendWhatsAppXSUN($adminTo, $waText);
    } else {
      $result['wa'] = ['http_code' => 0, 'error' => 'XSUN_TO not set and no phone provided', 'body' => ''];
    }
  }

  http_response_code(200);
  echo json_encode($result);
} catch (Throwable $e) {
  http_response_code(400);
  echo json_encode(['received' => false, 'error' => $e->getMessage()]);
}