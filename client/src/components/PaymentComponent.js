import React, { useState } from 'react';
import { midtransService } from '../services/midtrans';

const PaymentComponent = () => {
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');

  // Pricing packages sama dengan di Pricing.js
  const websitePackages = [
    {
      name: 'Basic',
      price: 599000,
      period: 'one-time',
      features: [
        'Website 5 halaman',
        'Design responsif',
        '500mb disk space + unlimited bandwidth',
        '1 email accounts',
        'SEO dasar',
        'Free Domain my.id',
        'Shared Hosting',
        '1x revisi gratis (1x per bulan)',
        'Bonus: Dukungan teknis gratis 1 bulan',
      ],
      color: '#4CAF50',
    },
    {
      name: 'Standard',
      price: 1199000,
      period: 'one-time',
      features: [
        'Website 10 halaman',
        'Design custom premium',
        'Responsif & mobile-friendly',
        'Optimasi SEO dasar (On-page)',
        'Disk space hingga 1GB + unlimited bandwidth',
        '1 akun email profesional',
        'Free domain .my.id (aktif 1 tahun)',
        'Shared hosting',
        '2x revisi gratis',
        'Estimasi pengerjaan: 5–10 hari kerja',
        'Bonus: Dukungan teknis gratis 30 hari',
      ],
      color: '#2196F3',
      popular: true,
    },
    {
      name: 'Pro',
      price: 1799000,
      period: 'one-time',
      features: [
        'Website unlimited halaman',
        'Premium template design',
        'Responsive & SEO on-page',
        'Disk space hingga 10GB + unlimited bandwidth',
        'Free email accounts',
        'Free domain .COM',
        'Shared hosting / CPanel',
        'Free revisi 3x',
        'Estimasi pengerjaan: 7–14 hari kerja',
      ],
      color: '#FF9800',
    },
    {
      name: 'Business',
      price: 5000000,
      period: 'one-time',
      features: [
        'Website unlimited halaman',
        'Custom design premium (exclusive)',
        'Responsive & SEO advanced',
        'Disk space unlimited + unlimited bandwidth',
        'Unlimited email accounts',
        'Free domain .COM + .ID',
        'Business hosting / CPanel',
        'Free revisi unlimited',
        'Estimasi pengerjaan: 14–21 hari kerja',
        'Bonus: Setup pro + Iklan Google 1 bulan (senilai Rp 1.400.000)',
        '🔥 Free maintenance 1 bulan untuk 5 pelanggan pertama!',
        '⭐ Dapatkan konsultasi gratis untuk optimasi website'
      ],
      color: '#2E7D32',
    },
  ];

  const handlePayment = async (packageData) => {
    const packageId = packageData.name;
    setLoading(prev => ({ ...prev, [packageId]: true }));
    setError('');

    try {
      const orderData = {
        orderId: `ORDER-${packageId}-${Date.now()}`,
        grossAmount: packageData.price,
        customerDetails: {
          first_name: 'Customer',
          last_name: 'Name',
          email: 'customer@example.com',
          phone: '08123456789'
        },
        itemDetails: [
          {
            id: packageId,
            price: packageData.price,
            quantity: 1,
            name: `${packageData.name} Package`
          }
        ]
      };

      const transaction = await midtransService.createTransaction(orderData);
      
      // Process payment with Snap
      const result = await midtransService.processPayment(transaction.token);
      
      console.log('Payment success:', result);
      alert(`Pembayaran ${packageData.name} Package berhasil!`);
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Terjadi kesalahan saat pembayaran');
    } finally {
      setLoading(prev => ({ ...prev, [packageId]: false }));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        Pilih Paket Website
      </h2>

      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#e3f2fd', 
        color: '#1565c0', 
        borderRadius: '8px',
        fontSize: '16px',
        textAlign: 'center'
      }}>
        <p><strong>📢 Informasi Pembayaran</strong></p>
        <p>Sistem pembayaran kami sedang dalam proses aktivasi. Untuk sementara, silakan hubungi admin untuk proses pembayaran manual.</p>
        <p><strong>WhatsApp:</strong> +62 85852345718</p>
        <p><strong>Email:</strong> cdiyunoru@gmail.com</p>
      </div>

      {error && (
        <div style={{ 
          marginBottom: '30px', 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {websitePackages.map((pkg) => (
          <div 
            key={pkg.name}
            style={{
              border: pkg.popular ? '2px solid #2196F3' : '1px solid #ddd',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: pkg.popular ? '#f8f9fa' : 'white',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
          >
            {pkg.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: pkg.color,
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                POPULER
              </div>
            )}
            
            <h3 style={{ 
              margin: '0 0 8px 0', 
              color: pkg.color,
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {pkg.name}
            </h3>
            
            <div style={{ margin: '16px 0' }}>
              <span style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#333' 
              }}>
                Rp {pkg.price.toLocaleString('id-ID')}
              </span>
              <span style={{ color: '#666', fontSize: '14px' }}>
                /{pkg.period === 'one-time' ? 'sekali' : pkg.period}
              </span>
            </div>

            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '20px 0',
              minHeight: '300px'
            }}>
              {pkg.features.map((feature, index) => (
                <li key={index} style={{ 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  color: '#555',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '8px', color: pkg.color }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePayment(pkg)}
              disabled={loading[pkg.name]}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading[pkg.name] ? '#ccc' : pkg.color,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading[pkg.name] ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
            >
              {loading[pkg.name] ? 'Processing...' : `Bayar Rp ${pkg.price.toLocaleString('id-ID')}`}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        <p>Powered by Midtrans</p>
        <p>Environment: Production</p>
      </div>
    </div>
  );
};

export default PaymentComponent;
