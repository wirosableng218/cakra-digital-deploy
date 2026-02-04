<?php // static page ?>
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Masuk | Cakra Digital</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <style>
    body { background: linear-gradient(135deg, #eef2f7, #f6f8fb); }
    .brand { display:flex; gap:.6rem; align-items:center; justify-content:center; margin-bottom: .75rem; }
    .brand .logo { width: 36px; height: 36px; border-radius: 10px; background:#0d6efd; display:grid; place-items:center; color:#fff; font-weight:700; }
    .brand .name { font-weight:700; letter-spacing:.3px; }
    .card { border: 1px solid rgba(0,0,0,.04); border-radius: 16px; }
    .input-group-text { background:#f1f3f5; }
    .divider { height:1px; background:#e9ecef; margin:1rem 0 1.25rem; }
  </style>
</head>
<body>
  <div class="container d-flex align-items-center justify-content-center min-vh-100 py-5">
    <div class="card shadow-sm" style="max-width: 460px; width: 100%;">
      <div class="card-body p-4 p-sm-5">
        <div class="brand">
          <div class="logo">CD</div>
          <div class="name">Cakra Digital</div>
        </div>
        <h1 class="h4 mb-1 text-center">Masuk</h1>
        <p class="text-muted text-center mb-3">Silakan masuk untuk melanjutkan</p>
        <div class="divider"></div>
        <form class="needs-validation" id="loginForm" novalidate method="POST" action="/cakra-digital-innovation/server/auth_login.php">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <input type="email" class="form-control" id="email" name="email" placeholder="nama@email.com" required>
              <div class="invalid-feedback">Masukkan email yang valid.</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Kata Sandi</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input type="password" class="form-control" id="password" name="password" placeholder="Minimal 8 karakter" minlength="8" required>
              <div class="invalid-feedback">Minimal 8 karakter.</div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="1" id="remember" name="remember">
              <label class="form-check-label" for="remember">Ingat saya</label>
            </div>
            <a href="#" class="small">Lupa kata sandi?</a>
          </div>
          <input type="hidden" name="package" id="pkgHidden">
          <button type="submit" class="btn btn-primary w-100">Masuk</button>
        </form>
        <p class="text-center mt-3 mb-0">Belum punya akun? <a id="toRegister" href="register.php">Daftar</a></p>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    (function(){
      const form = document.getElementById('loginForm');
      const urlParams = new URLSearchParams(window.location.search);
      const pkg = urlParams.get('package') || '';
      // Perbarui link ke register agar membawa parameter paket
      const toRegister = document.getElementById('toRegister');
      if (toRegister && pkg) {
        toRegister.href = 'register.php?package=' + encodeURIComponent(pkg);
      }

      // Set hidden package untuk diteruskan ke handler server
      const hiddenPkg = document.getElementById('pkgHidden');
      hiddenPkg.value = pkg;

      form.addEventListener('submit', function(e){
        if(!form.checkValidity()){
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add('was-validated');
        // jika valid, biarkan submit normal ke server/auth_login.php
      });
    })();
  </script>
</body>
</html>