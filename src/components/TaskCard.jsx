import React from 'react';
import './TaskCard.css';

export default function TaskCard({ card }) {
  const data = card || {
    tag: "CONTENT",
    title: "Product launch blog post",
    desc: "Explaining the revolutionary new feature set for Q4 release with expert...",
    aiType: "forecast",
    aiHeader: "✦ AI FORECAST",
    aiText: "Predicted 24% higher engagement if focus is shifted toward 'Sustainability' keywords."
  };

  return (
    <div className="rich-card">
      <div className="rich-card-header">
        <span className={`rich-tag tag-${data.tag?.toLowerCase() || 'default'}`}>
          {data.tag}
        </span>
        {data.tag === 'SOCIAL' && <span className="material-symbols-outlined check-icon">check_circle</span>}
        {data.tag === 'EMAIL' && <span className="date-tag">NOV 12</span>}
      </div>
      
      <h3 className="rich-title">{data.title}</h3>
      {data.desc && <p className="rich-desc">{data.desc}</p>}
      
      {data.aiType && (
        <div className={`rich-ai-block ai-${data.aiType}`}>
          <div className="ai-block-header">{data.aiHeader}</div>
          <div className="ai-block-text">{data.aiText}</div>
        </div>
      )}
      
      <div className="rich-footer">
        <div className="footer-avatars">
          <div className="fava">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3SzNzGReXHQz56v-ziaRnrAr05sTDrvnFnsliZau3bv3JTm68A_a9AO8ldbtHO4gPCR3x3NCuJPkGEcZxCsSi5wn4cCkh2aOi7D0oVLXuWbvRY6iHsxfTWquOrGLMiSDb8AqtHAro6glb_TB3QBcW0sgjODs832os19_sMNzInWzWWmbtgMvX1BAhOWlLw2oBuqrM-syKmakBugan3Ckay2onO96MPmr8QlwDiZ4lAyAq3xrnocDlrEVJfo2ZcaTbAQWDWIHohX7c" alt="Avatar" />
          </div>
          <div className="fava fava-2">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT6FKzBAlso1R8dg2KGP3k6nnKGgyWsQ2yH9l2yS-RjvCvEEtIs0VzYCPvliIjAjTFJf9GD0Kr4ADKD3GarMEhcLRwOkq6Krsap7tktB-FwaIA98UYc1EtzVfHrvzGu2oLUsfrFa5RIDygZPfda11QgriD5vq9IBYxoKehxlckYjWclVLk3anACFO0xmxslBzIwiw_glStcOBTbftA2BQbLw6KnL-A3wkaZUooui7gGzQsFmuQxQPAHoUif_Cc8Y4pmrhejpwTy7OZ" alt="Avatar" />
          </div>
        </div>
        
        <div className="footer-stats">
          <div className="stat-item">
            <span className="material-symbols-outlined icon-xs">chat_bubble</span> 
            <span>{data.comments || 12}</span>
          </div>
          <div className="stat-item">
            <span className="material-symbols-outlined icon-xs">schedule</span> 
            <span>{data.time || '2d'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
