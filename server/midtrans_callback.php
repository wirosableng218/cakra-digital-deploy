<?php
// server/midtrans_callback.php
// 1) parse JSON
header('Content-Type: application/json');
require_once __DIR__ . '/whatsapp.php';
require_once __DIR__ . '/PHPMailer.php';

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$orderId = $input['order_id'] ?? '';
$statusCode = $input['status_code'] ?? '';
$gross = $input['gross_amount'] ?? '';
$signature = $input['signature_key'] ?? '';
$serverKey = getenv('MIDTRANS_SERVER_KEY');

// 2) verifikasi signature
$expected = hash('sha512', $orderId . $statusCode . $gross . $serverKey);
if (!hash_equals($expected, $signature)) { http_response_code(403); echo json_encode(['error'=>'Invalid signature']); exit; }

// 3) cek status sukses
$txStatus = $input['transaction_status'] ?? '';
$paymentType = $input['payment_type'] ?? '';
if (in_array($txStatus, ['capture','settlement'], true)) {
  // Rangkai pesan WA
  $waTo = getenv('XSUN_TO') ?: '62XXXXXXXXXX';
  $msg = "Pembayaran berhasil\nOrder: {$orderId}\nTotal: Rp " . number_format((int)$gross,0,',','.') . "\nMetode: " . strtoupper($paymentType);
  $waRes = sendWhatsAppXSUN($waTo, $msg);

  // Kirim email
  $emailTo = getenv('NOTIFY_EMAIL') ?: 'admin@domain.com';
  $subject = "Pembayaran Berhasil #{$orderId}";
  $html = "<p>Pembayaran berhasil.</p><ul><li>Order: {$orderId}</li><li>Total: Rp ".number_format((int)$gross,0,',','.')."</li><li>Metode: ".htmlspecialchars($paymentType)."</li></ul>";
  try { sendEmailSMTP($emailTo, $subject, $html); } catch (\Throwable $e) {}

  // (Opsional) catat discount_redemptions berdasarkan custom_field1
}
// 4) balas 200
http_response_code(200);
echo json_encode(['ok'=>true]);