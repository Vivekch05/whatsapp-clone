import React, { useState } from 'react';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, email, phone });
    onClose();
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
      }}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#eee', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#25d366', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;