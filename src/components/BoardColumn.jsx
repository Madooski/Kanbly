import React from 'react';
import TaskCard from './TaskCard';

export default function BoardColumn({ column }) {
  const data = column || {
    title: "DRAFTING",
    count: 2,
    cards: []
  };

  return (
    <div className="board-column">
      <div className="col-header-rich">
        <span className="col-header-title">{data.title}</span>
        <span className="col-header-count">{data.count}</span>
      </div>
      
      <div className="col-cards-rich">
        {data.cards.map((card, idx) => (
           <TaskCard key={idx} card={card} />
        ))}
        {/* Subtle inline create task button */}
        {data.title === "DRAFTING" && (
          <div className="create-task-inline">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Create New Task
          </div>
        )}
      </div>
    </div>
  );
}
