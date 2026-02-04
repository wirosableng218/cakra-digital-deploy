<?php
header('Content-Type: application/json');

// TODO: sesuaikan kredensial DB Anda
$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbName = getenv('DB_NAME') ?: 'cakra';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$code = trim($input['code'] ?? '');
$amount = (int)($input['amount'] ?? 0);
$userKey = trim($input['user_key'] ?? '');

if ($code === '' || $amount <= 0) {
  echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Data tidak lengkap']); exit;
}

try {
  $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  ]);

  // Ambil promo
  $stmt = $pdo->prepare("SELECT * FROM discount_codes WHERE code = :code LIMIT 1");
  $stmt->execute(['code' => $code]);
  $promo = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$promo || (int)$promo['is_active'] !== 1) {
    echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Kode tidak aktif/invalid']); exit;
  }

  $now = date('Y-m-d H:i:s');
  if (($promo['starts_at'] && $now < $promo['starts_at']) || ($promo['ends_at'] && $now > $promo['ends_at'])) {
    echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Kode di luar periode']); exit;
  }

  if ($amount < (int)$promo['min_amount']) {
    echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Nominal belum memenuhi minimum']); exit;
  }

  // Cek usage_limit total
  if (!is_null($promo['usage_limit'])) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM discount_redemptions WHERE discount_id = :id");
    $stmt->execute(['id' => $promo['id']]);
    $used = (int)$stmt->fetchColumn();
    if ($used >= (int)$promo['usage_limit']) {
      echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Batas penggunaan promo tercapai']); exit;
    }
  }

  // Cek per_user_limit
  $perUser = (int)$promo['per_user_limit'];
  if ($perUser > 0 && $userKey !== '') {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM discount_redemptions WHERE discount_id = :id AND user_key = :uk");
    $stmt->execute(['id' => $promo['id'], 'uk' => $userKey]);
    $usedByUser = (int)$stmt->fetchColumn();
    if ($usedByUser >= $perUser) {
      echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Batas penggunaan per pengguna tercapai']); exit;
    }
  }

  // Hitung diskon
  $discount = 0;
  if ($promo['type'] === 'percent') {
    $percent = max(0, min(100, (int)$promo['value']));
    $discount = (int) floor($amount * ($percent / 100));
  } else { // fixed
    $discount = max(0, (int)$promo['value']);
  }
  $final = max(0, $amount - $discount);

  echo json_encode([
    'valid' => true,
    'discount' => $discount,
    'final_amount' => $final,
    'message' => 'OK',
    'meta' => [
      'type' => $promo['type'],
      'value' => (int)$promo['value'],
      'id' => (int)$promo['id'],
      'code' => $promo['code'],
    ]
  ]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['valid' => false, 'discount' => 0, 'final_amount' => $amount, 'message' => 'Server error']);
}