<?php
function sendWhatsAppXSUN(string $to, string $message): array {
  $apiUrl = getenv('XSUN_API_URL') ?: 'https://www.x-sun.net/api/send';
  $apiKey = getenv('XSUN_API_KEY') ?: '';

  $payload = [
    'to' => $to,           // nomor tujuan format 62xxxx
    'message' => $message, // teks
  ];

  $ch = curl_init($apiUrl);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      'Content-Type: application/json',
      'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 20,
  ]);
  $res = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);

  return ['http_code' => $code, 'error' => $err, 'body' => $res];
}