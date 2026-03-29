// src/components/Button.jsx
import React from 'react';
import './Button.css'; // Importing its own CSS file!

export default function Button({ children, disabled, onClick }) {
  return (
    <button className="btn-primary" disabled={disabled} onClick={onClick}>
      {children}
      <span className="material-symbols-outlined button-arrow">arrow_forward</span>
    </button>
  );
}
