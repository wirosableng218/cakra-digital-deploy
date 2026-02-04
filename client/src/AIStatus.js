// AI Status Component untuk menampilkan status AI service
import React from 'react';

function AIStatus({ aiService }) {
  const getStatusInfo = () => {
    switch (aiService.serviceType) {      case 'openai':
        return {
          status: 'active',
          message: '🤖 Customer Service kami aktif',
          color: 'var(--theme)',
        };
      case 'quota_exceeded':
        return {
          status: 'warning',
          message: '⚠️ OpenAI quota exceeded, menggunakan mode fallback',
          color: '#FF9800',
        };
      case 'fallback':
        return {
          status: 'info',
          message: '💬 Mode fallback aktif (rule-based responses)',
          color: '#2196F3',
        };
      default:
        return {
          status: 'info',
          message: '💬 Chat Assistant siap membantu',
          color: '#2196F3',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div
      className="ai-status"        style={{
          padding: '8px 12px',
          backgroundColor: statusInfo.color === 'var(--theme)' ? 'color-mix(in oklab, var(--theme) 20%, transparent)' : statusInfo.color + '20',
          border: `1px solid ${statusInfo.color}`,
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: statusInfo.color,
          marginBottom: '10px',
          textAlign: 'center',
        }}
    >
      {statusInfo.message}
    </div>
  );
}

export default AIStatus;
