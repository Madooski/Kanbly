// src/components/FieldCard.jsx
import React from 'react';
import './FieldCard.css'; // Importing its own CSS file!

export default function FieldCard({ title, icon, isSelected, onClick }) {
  return (
    <div className={`field-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {isSelected && (
        <div className="selected-check">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
      )}

      <span className="material-symbols-outlined card-icon">
        {icon}
      </span>
      <span className="card-title">{title}</span>

      {isSelected && <div className="selected-bottom-bar"></div>}
    </div>
  );
}



