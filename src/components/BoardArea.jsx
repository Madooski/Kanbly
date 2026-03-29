import React from 'react';
import BoardColumn from './BoardColumn';
import './BoardArea.css';

export default function BoardArea() {
  const columns = [
    { 
      title: "DRAFTING", count: 2, 
      cards: [
        {
          tag: "CONTENT", title: "Product launch blog post",
          desc: "Explaining the revolutionary new feature set for Q4 release with expert insights.",
          aiType: "forecast", aiHeader: "✦ AI FORECAST", aiText: "Predicted 24% higher engagement if focus is shifted toward 'Sustainability' keywords.",
          comments: 12, time: "2d"
        },
        {
          tag: "STRATEGY", title: "Q4 Video Content Map",
          desc: "Structuring the video series for YouTube Shorts and TikTok alignment.",
          comments: 4, time: "5d"
        }
      ] 
    },
    { 
      title: "IN REVIEW", count: 1, 
      cards: [
        {
          tag: "SOCIAL", title: "LinkedIn Q4 Lead Gen Campaign",
          desc: "Finalizing the copy for the carousel ads targeting CMOs in mid-market SaaS.",
          aiType: "insight", aiHeader: "✦ PERFORMANCE INSIGHT", aiText: "Audience overlap detected. Consolidate with 'Q4 Webinar' to save 12% ad spend.",
          comments: 8, time: "1h"
        }
      ] 
    },
    { 
      title: "SCHEDULED", count: 1, 
      cards: [
        {
          tag: "EMAIL", title: "Monthly Insights Newsletter",
          desc: "Curation of the best blog posts from last month for the subscriber list.",
          aiType: "timing", aiHeader: "✦ BEST TIME TO POST", aiText: "Engagement peaks at 10:15 AM EST for your current list demographics.",
          comments: 2, time: "4/4"
        }
      ] 
    }
  ];

  return (
    <div className="board-area">
      {columns.map((col, idx) => (
        <BoardColumn key={idx} column={col} />
      ))}
    </div>
  );
}
