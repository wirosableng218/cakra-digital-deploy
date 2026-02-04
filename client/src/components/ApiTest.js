import React, { useState, useEffect } from 'react';
import { getUsers, submitContact, checkHealth } from '../api';

const ApiTest = () => {
  const [users, setUsers] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await checkHealth();
      setHealth({ message: 'API is running' });
    } catch (err) {
      setError('Failed to connect to API');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const userData = await getUsers();
      setUsers(userData);
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await submitContact(contactForm);
      alert('Contact form submitted successfully!');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to submit contact: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>API Test Component</h2>
      
      {/* Health Check */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>API Health Status</h3>
        {health ? (
          <p style={{ color: 'green' }}>✅ {health.message}</p>
        ) : (
          <p style={{ color: 'red' }}>❌ Checking API status...</p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '5px' }}>
          {error}
        </div>
      )}

      {/* Users Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Users Data</h3>
        <button 
          onClick={fetchUsers} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>
        
        {users.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4>Users List:</h4>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  {user.name || user.username || `User ${index + 1}`} 
                  {user.email && ` (${user.email})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Contact Form */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Contact Form Test</h3>
        <form onSubmit={handleContactSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={contactForm.name}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={contactForm.email}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
            <textarea
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              required
              rows="4"
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Contact'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiTest;
