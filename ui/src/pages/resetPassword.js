import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/save-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Password reset failed.');
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
