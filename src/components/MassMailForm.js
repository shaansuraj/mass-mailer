import React, { useState } from 'react';
import { validateEmails, readCSVFile, sendEmails } from '../utils/emailUtils';
import './MassMailer.css';

const MassMailForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [validEmails, setValidEmails] = useState([]);
  const [invalidEmails, setInvalidEmails] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const emails = await readCSVFile(file);

    const { validEmails, invalidEmails } = validateEmails(emails);
    setValidEmails(validEmails);
    setInvalidEmails(invalidEmails);
  };

  const handleSubmit = async () => {
    const result = await sendEmails(validEmails, subject, message);
    alert(result.message);
  };

  return (
    <div className="massmailer-container">
      <h2>Mass Mail Dispatcher</h2>
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Send Emails</button>

      <div className="email-lists">
        <h3>Valid Emails</h3>
        <p>{validEmails.join(', ')}</p>
        <h3>Invalid Emails</h3>
        <p>{invalidEmails.join(', ')}</p>
      </div>
    </div>
  );
};

export default MassMailForm;
