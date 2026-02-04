<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$autoload1 = __DIR__ . '/../vendor/autoload.php';
$autoload2 = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoload1)) { require_once $autoload1; }
elseif (file_exists($autoload2)) { require_once $autoload2; }

function sendEmailSMTP($to, $subject, $bodyHtml) {
  // If PHPMailer is available via Composer autoload
  if (class_exists(PHPMailer::class)) {
    try {
      $mail = new PHPMailer(true);
      $mail->isSMTP();
      $host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
      $port = getenv('SMTP_PORT') ?: '587';
      $user = getenv('SMTP_USER') ?: 'cdiyunoru@gmail.com';
      $pass = getenv('SMTP_PASS') ?: 'iscq lyez jbuz pkqi';
      $secure = getenv('SMTP_SECURE') ?: 'tls';
      // Paksa IPv4 resolution untuk menghindari isu IPv6 pada jaringan lokal
      $resolved = @gethostbyname($host);
      $mail->Host = $resolved ?: $host;
      // Ikuti env, namun jika env mengarah ke tls:587 yang gagal, fallback di bawah akan mencoba ssl:465
      $mail->Port = (int)$port;
      $mail->SMTPAuth = true;
      $mail->Username = $user;
      $mail->Password = $pass;
      if ($secure) $mail->SMTPSecure = $secure;

      $from = getenv('SMTP_FROM') ?: 'cdiyunoru@gmail.com';
      $fromName = getenv('SMTP_FROM_NAME') ?: 'Cakra Digital';
      $mail->setFrom($from, $fromName);
      $mail->addAddress($to);
      $mail->isHTML(true);
      $mail->Subject = $subject;
      $mail->Body = $bodyHtml;
      $mail->AltBody = strip_tags($bodyHtml);
      // Tambah timeout & opsi SSL untuk dev lokal (hapus jika sudah stabil)
      $mail->Timeout = 15;
      $mail->SMTPKeepAlive = false;
      $mail->SMTPOptions = [
        'ssl' => [
          'verify_peer' => false,
          'verify_peer_name' => false,
          'allow_self_signed' => true,
        ]
      ];

      $lastError = '';
      // Coba kirim dengan konfigurasi saat ini dulu, lalu fallback ke ssl:465 jika gagal
      for ($i = 0; $i < 2; $i++) {
        try {
            $mail->SMTPDebug = 2;
            $mail->Debugoutput = function($s){ error_log('PHPMailer: '.$s); };  
          $mail->send();
          return ['ok'=>true, 'driver'=>'phpmailer'];
        } catch (Exception $ex) {
          $lastError = $ex->getMessage();
          // Fallback sekali ke ssl:465 jika awalnya tls:587 gagal
          if ($i === 0) {
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            continue;
          }
          throw $ex; // keluar loop pada percobaan kedua
        }
      }
    } catch (Exception $e) {
      return ['ok'=>false, 'driver'=>'phpmailer', 'error'=>$e->getMessage()];
    }
  }
  // Fallback to native mail() jika PHPMailer tidak tersedia
  $headers  = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8\r\n";
  $from = getenv('SMTP_FROM') ?: 'cdiyunoru@gmail.com';
  $fromName = getenv('SMTP_FROM_NAME') ?: 'Cakra Digital';
  $headers .= "From: {$fromName} <{$from}>\r\n";
  $ok = @mail($to, $subject, $bodyHtml, $headers);
  return ['ok'=>$ok, 'driver'=>'mail'];
}