import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import AIService from './AIService';
import AIStatus from './AIStatus';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Halo! Selamat datang di Cakra Digital Innovation. Ada yang bisa saya bantu?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiService] = useState(new AIService());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get conversation history for AI context
  const getConversationHistory = () => {
    return messages
      .filter((msg) => msg.sender !== 'system')
      .slice(-10) // Last 10 messages for context
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get conversation history for AI context
      const conversationHistory = getConversationHistory();

      // Generate AI response
      const aiResponse = await aiService.generateAIResponse(inputMessage, conversationHistory);

      // Simulate thinking time
      await aiService.simulateThinking();

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);

      // Fallback response
      const fallbackMessage = {
        id: Date.now() + 1,
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung di WhatsApp +62 812-3456-7890',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget">
      {!isOpen && (
        <button
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
        >
          <i className="chat-icon">💬</i>
          <span>Chat dengan Customer Service</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar"><img src={`${process.env.PUBLIC_URL}/images/cs.jpg`} alt="Customer Service" className="chat-avatar-img" /></div>
              <div>
                <h4>Customer Service</h4>
                <p>Online</p>
              </div>
            </div>
            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            <AIStatus aiService={aiService} />
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message ai">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="chat-input-field"
            />
            <button
              onClick={handleSendMessage}
              className="chat-send-btn"
              disabled={!inputMessage.trim()}
            >
              <i>📤</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
