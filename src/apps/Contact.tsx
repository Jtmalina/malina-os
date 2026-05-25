import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string | null>('Connected to mail server');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Inquiry from Portfolio',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus('Sending message...');
    
    const recipient = 'jmalina7897@gmail.com';
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus('Message sent to outbox.');
    }, 1000);
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: 'Inquiry from Portfolio', message: '' });
    setStatus('Form cleared.');
  };

  return (
    <div className={styles.outlook}>
      {/* Menu Bar */}
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>File</span>
        <span className={styles.menuItem}>Edit</span>
        <span className={styles.menuItem}>View</span>
        <span className={styles.menuItem}>Tools</span>
        <span className={styles.menuItem}>Compose</span>
        <span className={styles.menuItem}>Help</span>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.toolButton} onClick={() => handleSubmit()}>
          <span className={styles.toolIcon}>📝</span>
          <span className={styles.toolLabel}>Send</span>
        </button>
        <button className={styles.toolButton} onClick={handleClear}>
          <span className={styles.toolIcon}>🔄</span>
          <span className={styles.toolLabel}>Clear</span>
        </button>
        <div style={{ width: '1px', background: '#808080', margin: '2px 4px', boxShadow: '1px 0 #fff' }}></div>
        <button className={styles.toolButton}>
          <span className={styles.toolIcon}>📖</span>
          <span className={styles.toolLabel}>Address</span>
        </button>
        <button className={styles.toolButton}>
          <span className={styles.toolIcon}>❌</span>
          <span className={styles.toolLabel}>Delete</span>
        </button>
      </div>

      <div className={styles.mainView}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Folders</div>
          <div className={styles.folderList}>
            <div className={styles.folderItem}>📁 Outlook Express</div>
            <div className={styles.folderItem}>&nbsp;&nbsp;📥 Inbox</div>
            <div className={styles.folderItem}>&nbsp;&nbsp;📤 Outbox</div>
            <div className={styles.folderItem}>&nbsp;&nbsp;📧 Sent Items</div>
            <div className={styles.folderItem}>&nbsp;&nbsp;🗑️ Deleted Items</div>
            <div className={`${styles.folderItem} ${styles.folderItemActive}`}>&nbsp;&nbsp;📇 Contacts</div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          <form className={styles.messageHeader} onSubmit={handleSubmit}>
            <div className={styles.headerField}>
              <label className={styles.headerLabel} htmlFor="name">From:</label>
              <input 
                type="text" 
                id="name" 
                className={styles.headerInput}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className={styles.headerField}>
              <label className={styles.headerLabel} htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                className={styles.headerInput}
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className={styles.headerField}>
              <label className={styles.headerLabel} htmlFor="subject">Subject:</label>
              <input 
                type="text" 
                id="subject" 
                className={styles.headerInput}
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <div className={styles.messageBody}>
            <textarea 
              id="message" 
              className={styles.messageTextarea}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusItem}>{status}</div>
        <div className={styles.statusItem}>1 contact(s) selected</div>
        <div style={{ marginLeft: 'auto' }}>Working Online</div>
      </div>
    </div>
  );
};

export default Contact;
