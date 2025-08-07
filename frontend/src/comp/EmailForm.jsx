import React, { useState } from 'react';

function EmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, text }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder='Recipient'
      />
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder='Subject'
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Message'
      />
      <button type='submit'>Send Email</button>
    </form>
  );
}

export default EmailForm;
