import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Jika sedang di dev server React (localhost:3002), arahkan langsung ke Apache (port 80)
      const isDevReact = /localhost:3002$/i.test(window.location.host);
      const endpoint = isDevReact
        ? 'http://localhost/cakra-digital-innovation/server/feedback.php'
        : (window.location.pathname.includes('cakra-digital-innovation')
            ? '/cakra-digital-innovation/server/feedback.php'
            : '/server/feedback.php');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          send_channels: ['email']
        })
      });

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const payload = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error(isJson ? (payload.error || 'Gagal mengirim feedback') : 'Server mengembalikan non-JSON');
      }
      if (isJson && payload.received !== true) {
        throw new Error(payload.error || 'Gagal mengirim feedback');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert(err.message || 'Terjadi kesalahan saat mengirim.');
    }
  };

  return (
    <div className="feedback-form">
      <h3>Kirim Feedback Anda</h3>
      {submitted && <p className="success-message">Terima kasih atas feedback Anda!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nama Anda"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Anda"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Pesan Anda"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          className="submit-button"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
