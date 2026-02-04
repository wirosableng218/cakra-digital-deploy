<?php
// Payment gateway integration dengan environment variables

// Load environment variables
$server_key = $_ENV['MIDTRANS_SERVER_KEY'] ?? '';
$client_key = $_ENV['MIDTRANS_CLIENT_KEY'] ?? '';
$is_production = $_ENV['MIDTRANS_IS_PRODUCTION'] ?? 'false';

if (!$server_key || !$client_key) {
    http_response_code(500);
    echo json_encode(['error' => 'Midtrans configuration missing']);
    exit;
}

// Midtrans configuration
\Midtrans\Config::$serverKey = $server_key;
\Midtrans\Config::$isProduction = $is_production === 'true';
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

// Get request data
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

try {
    // Create transaction
    $transaction_details = array(
        'order_id' => rand(),
        'gross_amount' => $json_obj->amount ?? 10000,
    );

    $customer_details = array(
        'first_name' => $json_obj->first_name ?? 'Customer',
        'last_name' => $json_obj->last_name ?? 'Name',
        'email' => $json_obj->email ?? 'customer@example.com',
        'phone' => $json_obj->phone => '08123456789',
    );

    $transaction_data = array(
        'transaction_details' => $transaction_details,
        'customer_details' => $customer_details,
    );

    $snap_token = \Midtrans\Snap::getSnapToken($transaction_data);

    echo json_encode([
        'token' => $snap_token,
        'client_key' => $client_key
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
