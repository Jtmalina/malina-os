import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Opening email client...');
    
    const recipient = 'jmalina7897@gmail.com';
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Trigger the email client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus('Email client launched. If it didn\'t open, check your settings.');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Send a message to the administrator.</p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">From:</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            className="inset" 
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="inset" 
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            rows={5} 
            value={formData.message}
            onChange={handleChange}
            required 
            className="inset"
          ></textarea>
        </div>
        
        <div className={styles.actions}>
          <button type="submit">Send</button>
          <button 
            type="reset" 
            onClick={() => {
              setStatus(null);
              setFormData({ name: '', email: '', message: '' });
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {status && (
        <div className={`${styles.statusBar} inset`}>
          {status}
        </div>
      )}
    </div>
  );
};

export default Contact;
