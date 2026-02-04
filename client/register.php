<?php // static page ?>
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Daftar | Cakra Digital</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <style>
    body { background: linear-gradient(135deg, #eef2f7, #f6f8fb); }
    .brand { display:flex; gap:.6rem; align-items:center; justify-content:center; margin-bottom: .75rem; }
    .brand .logo { width: 36px; height: 36px; border-radius: 10px; background:#198754; display:grid; place-items:center; color:#fff; font-weight:700; }
    .brand .name { font-weight:700; letter-spacing:.3px; }
    .card { border: 1px solid rgba(0,0,0,.04); border-radius: 16px; }
    .input-group-text { background:#f1f3f5; }
    .hint { font-size:.85rem; color:#6c757d; }
    .divider { height:1px; background:#e9ecef; margin:1rem 0 1.25rem; }
  </style>
</head>
<body>
  <div class="container d-flex align-items-center justify-content-center min-vh-100 py-5">
    <div class="card shadow-sm" style="max-width: 520px; width: 100%;">
      <div class="card-body p-4 p-sm-5">
        <div class="brand">
          <div class="logo">CD</div>
          <div class="name">Cakra Digital</div>
        </div>
        <h1 class="h4 mb-1 text-center">Daftar Akun</h1>
        <p class="text-muted text-center mb-3">Buat akun baru untuk mulai menggunakan layanan</p>
        <div class="divider"></div>
        <form class="needs-validation" id="registerForm" novalidate method="POST" action="/cakra-digital-innovation/server/auth_register.php">
          <div class="mb-3">
            <label for="name" class="form-label">Nama Lengkap</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input type="text" class="form-control" id="name" name="name" placeholder="Nama Anda" minlength="2" required>
              <div class="invalid-feedback">Nama minimal 2 karakter.</div>
            </div>
          </div>
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
            <div class="hint mt-1">Gunakan kombinasi huruf besar, kecil, angka, dan simbol untuk keamanan maksimal.</div>
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Konfirmasi Kata Sandi</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
              <input type="password" class="form-control" id="password_confirm" name="password_confirm" placeholder="Ulangi kata sandi" required>
              <div class="invalid-feedback">Konfirmasi harus sama dengan kata sandi.</div>
            </div>
          </div>
          <input type="hidden" name="package" id="pkgHidden">
          <button type="submit" class="btn btn-success w-100">Daftar</button>
        </form>
        <p class="text-center mt-3 mb-0">Sudah punya akun? <a href="login.php">Masuk</a></p>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    (function(){
      const form = document.getElementById('registerForm');
      const pwd = document.getElementById('password');
      const pwd2 = document.getElementById('password_confirm');
      const urlParams = new URLSearchParams(window.location.search);
      const pkg = urlParams.get('package') || '';
      const hiddenPkg = document.getElementById('pkgHidden');
      hiddenPkg.value = pkg;

      form.addEventListener('submit', function(e){
        let valid = form.checkValidity();
        if(pwd.value !== pwd2.value){
          pwd2.setCustomValidity('Tidak sama');
          valid = false;
        } else {
          pwd2.setCustomValidity('');
        }
        if(!valid){
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add('was-validated');
      });
      pwd2.addEventListener('input', function(){
        if(pwd.value === pwd2.value){
          pwd2.setCustomValidity('');
        }
      });
    })();
  </script>
</body>
</html>