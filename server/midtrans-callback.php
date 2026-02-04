<?php
// Midtrans callback handler untuk Vercel Functions

require_once 'vendor/autoload.php';

// Load environment variables
$server_key = $_ENV['MIDTRANS_SERVER_KEY'] ?? '';

if (!$server_key) {
    http_response_code(500);
    echo json_encode(['error' => 'Midtrans configuration missing']);
    exit;
}

// Get notification data
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

// Verify signature
$signature_key = hash('sha512', $json_obj->order_id . $json_obj->status_code . $json_obj->gross_amount . $server_key);

if ($signature_key != $json_obj->signature_key) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid signature']);
    exit;
}

// Process transaction status
$transaction_status = $json_obj->transaction_status;
$order_id = $json_obj->order_id;

// Log transaction (you can save to database here)
error_log("Transaction $order_id status: $transaction_status");

// Handle different transaction statuses
switch ($transaction_status) {
    case 'capture':
        // Payment successful
        break;
    case 'settlement':
        // Payment settled
        break;
    case 'pending':
        // Payment pending
        break;
    case 'deny':
        // Payment denied
        break;
    case 'expire':
        // Payment expired
        break;
    case 'cancel':
        // Payment canceled
        break;
}

echo json_encode(['status' => 'success']);
?>
