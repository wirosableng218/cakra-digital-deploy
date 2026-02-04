<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . '/db.php';

$base = '/cakra-digital-innovation';

$name     = trim($_POST['name'] ?? '');
$email    = strtolower(trim($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';
$confirm  = $_POST['password_confirm'] ?? '';
$package  = trim($_POST['package'] ?? '');

if ($name === '' || $email === '' || strlen($password) < 8 || $password !== $confirm) {
  header('Location: ' . $base . '/client/register.php' . ($package !== '' ? ('?package=' . urlencode($package) . '&error=invalid') : '?error=invalid'));
  exit;
}

try {
  $pdo = get_pdo();

  // Cek email unik
  $check = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
  $check->execute([$email]);
  if ($check->fetch()) {
    header('Location: ' . $base . '/client/register.php' . ($package !== '' ? ('?package=' . urlencode($package) . '&error=exists') : '?error=exists'));
    exit;
  }

  // Simpan user baru
  $hash = password_hash($password, PASSWORD_DEFAULT);
  $ins  = $pdo->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
  $ins->execute([$name, $email, $hash]);

  // Redirect ke login dengan notifikasi sukses
  header('Location: ' . $base . '/client/login.php' . ($package !== '' ? ('?package=' . urlencode($package) . '&registered=1') : '?registered=1'));
  exit;
} catch (Throwable $e) {
  header('Location: ' . $base . '/client/register.php?error=server');
  exit;
}
