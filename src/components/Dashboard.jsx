import React from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import BoardArea from './BoardArea';
import './Dashboard.css';

export default function Dashboard({ initialField, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`dashboard-app ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <TopNavbar onToggleSidebar={toggleSidebar} onChangeField={onLogout} />
      
      <div className="dashboard-body">
        <Sidebar initialField={initialField} onLogout={onLogout} isOpen={isSidebarOpen} />
        
        <div className="dashboard-main">
          <TopHeader />
          <BoardArea />
        </div>
      </div>
    </div>
  );
}
