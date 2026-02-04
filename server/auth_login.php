<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . '/db.php';

$base = '/cakra-digital-innovation';

$email    = strtolower(trim($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';
$remember = isset($_POST['remember']) ? (int)$_POST['remember'] : 0;
$package  = trim($_POST['package'] ?? '');

if ($email === '' || strlen($password) < 8) {
  header('Location: ' . $base . '/client/login.php' . ($package !== '' ? ('?package=' . urlencode($package) . '&error=invalid') : '?error=invalid'));
  exit;
}

try {
  $pdo = get_pdo();
  $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE email = ? LIMIT 1');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if (!$user || !password_verify($password, $user['password_hash'])) {
    header('Location: ' . $base . '/client/login.php' . ($package !== '' ? ('?package=' . urlencode($package) . '&error=auth') : '?error=auth'));
    exit;
  }

  $_SESSION['user_id'] = (int)$user['id'];
  if ($remember) {
    $params = session_get_cookie_params();
    setcookie(session_name(), session_id(), time()+60*60*24*30, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
  }

  header('Location: ' . $base . '/client/payment.php' . ($package !== '' ? ('?package=' . urlencode($package)) : ''));
  exit;
} catch (Throwable $e) {
  header('Location: ' . $base . '/client/login.php?error=server');
  exit;
}
