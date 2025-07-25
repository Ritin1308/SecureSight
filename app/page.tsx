'use client';

import React, { useState } from 'react';
import { Camera, Eye, AlertTriangle, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import IncidentList from '@/components/IncidentList';
import IncidentPlayer from '@/components/IncidentPlayer';
import { Incident, Camera as CameraType, TabType } from '@/types';

// Inline styles combining the best from your original files
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  },
  mainContent: {
    display: 'flex',
    height: 'calc(100vh - 80px)' // Adjusted for navbar height
  },
  leftPanel: {
    flex: 1,
    padding: '24px'
  },
  rightPanel: {
    width: '480px',
    backgroundColor: '#1f2937',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    borderLeft: '1px solid #374151'
  },
  tabContent: {
    padding: '24px',
    color: 'white',
    flex: 1
  },
  tabTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  contentGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  contentCard: {
    padding: '16px',
    backgroundColor: '#374151',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  cardDescription: {
    color: '#9ca3af',
    fontSize: '14px'
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontWeight: '600',
    marginBottom: '4px'
  },
  userRole: {
    fontSize: '14px',
    color: '#9ca3af'
  }
};

// Using the more extensive mock data
const mockIncidents: Incident[] = [
    { id: 1, type: 'Gun Threat', camera: 'Shop Floor Camera A', time: '14:32 - 14:34 on 7-Jul-2025', priority: 'critical', resolved: false },
    { id: 2, type: 'Unauthorized Access', camera: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', priority: 'high', resolved: false },
    { id: 3, type: 'Unauthorised Access', camera: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', priority: 'high', resolved: false },
    { id: 4, type: 'Unauthorised Access', camera: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', priority: 'high', resolved: false },
    { id: 5, type: 'Unauthorised Access', camera: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', priority: 'high', resolved: false },
    { id: 6, type: 'Face Recognized', camera: 'Entrance Camera C', time: '16:30 - 16:32 on 5-Jul-2025', priority: 'medium', resolved: true },
    { id: 7, type: 'Face Recognised', camera: 'Entrance Camera C', time: '16:30 - 16:32 on 5-Jul-2025', priority: 'medium', resolved: true },
    { id: 8, type: 'Face Recognised', camera: 'Entrance Camera C', time: '16:30 - 16:32 on 5-Jul-2025', priority: 'medium', resolved: true },
    { id: 9, type: 'Face Recognised', camera: 'Entrance Camera C', time: '16:30 - 16:32 on 5-Jul-2025', priority: 'medium', resolved: true },
    { id: 10, type: 'Motion Detected', camera: 'Parking Camera D', time: '18:45 - 18:47 on 6-Jul-2025', priority: 'low', resolved: false },
    { id: 11, type: 'Suspicious Activity', camera: 'Back Exit Camera B', time: '20:15 - 20:18 on 6-Jul-2025', priority: 'high', resolved: false },
    { id: 12, type: 'Face Recognised', camera: 'Main Entrance A', time: '09:30 - 09:32 on 7-Jul-2025', priority: 'medium', resolved: true }
];

const cameras: CameraType[] = [
  { id: 'Camera - 01', status: 'Unauthorized Access', statusColor: 'orange' },
  { id: 'Camera - 02', status: 'Face Recognized', statusColor: 'blue' },
  { id: 'Camera - 03', status: 'Traffic congestion', statusColor: 'cyan' }
];

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedCamera, setSelectedCamera] = useState<string>('Camera - 01');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleResolveIncident = (incidentId: number) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, resolved: true }
          : incident
      )
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
  };

  const handleCameraSelect = (cameraId: string) => {
    setSelectedCamera(cameraId);
  };

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#4b5563';
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#374151';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <IncidentPlayer 
            cameras={cameras}
            selectedCamera={selectedCamera}
            onCameraSelect={handleCameraSelect}
          />
        );

      case 'cameras':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Camera Management</h2>
            <div style={styles.contentGrid}>
              {cameras.map((camera) => (
                <div 
                  key={camera.id} 
                  style={styles.contentCard}
                  onClick={() => setSelectedCamera(camera.id)}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Camera size={20} />
                    <span style={styles.cardTitle}>{camera.id}</span>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: '1px solid',
                    display: 'inline-block',
                    color: camera.statusColor === 'orange' ? '#fb923c' : 
                           camera.statusColor === 'blue' ? '#60a5fa' : '#22d3ee',
                    backgroundColor: camera.statusColor === 'orange' ? 'rgba(154, 52, 18, 0.2)' :
                                   camera.statusColor === 'blue' ? 'rgba(30, 58, 138, 0.2)' : 'rgba(22, 78, 99, 0.2)',
                    borderColor: camera.statusColor === 'orange' ? '#fb923c' :
                               camera.statusColor === 'blue' ? '#60a5fa' : '#22d3ee'
                  }}>
                    {camera.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'scenes':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Scene Analysis</h2>
            {/* ... content from original page.tsx ... */}
          </div>
        );

      case 'incidents':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>All Incidents</h2>
            {/* ... content from original page.tsx ... */}
          </div>
        );

      case 'users':
        const users = [
          { id: 1, name: 'Mohammed Abbas', role: 'Administrator', initials: 'MA', bgColor: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)' },
          { id: 2, name: 'John Doe', role: 'Security Officer', initials: 'JD', bgColor: 'linear-gradient(to bottom right, #f59e0b, #d97706)' }
        ];
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>User Management</h2>
            <div style={styles.contentGrid}>
              {users.map((user) => (
                <div key={user.id} style={styles.contentCard} onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
                  <div style={styles.userCard}>
                    <div style={{ ...styles.userAvatar, background: user.bgColor }}>
                      {user.initials}
                    </div>
                    <div style={styles.userInfo}>
                      <div style={styles.userName}>{user.name}</div>
                      <div style={styles.userRole}>{user.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <IncidentPlayer cameras={cameras} selectedCamera={selectedCamera} onCameraSelect={handleCameraSelect} />;
    }
  };

  const renderRightPanel = () => {
    if (activeTab === 'dashboard') {
      return (
        <div style={styles.rightPanel}>
            <IncidentList 
              incidents={incidents}
              onResolve={handleResolveIncident}
            />
        </div>
      );
    }
    
    // Simplified sidebar for other tabs
    return (
      <div style={{...styles.rightPanel, width: '384px', padding: '24px'}}>
        <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {activeTab === 'cameras' && <><Camera size={18} />Camera Status</>}
          {activeTab === 'scenes' && <><Eye size={18} />Scene Overview</>}
          {activeTab === 'incidents' && <><AlertTriangle size={18} />Incident Summary</>}
          {activeTab === 'users' && <><Users size={18} />User Activity</>}
        </h3>
        <div style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center' as const, marginTop: '40px' }}>
          {activeTab === 'cameras' && 'Monitor and manage all security cameras'}
          {activeTab === 'scenes' && 'View and analyze different security zones'}
          {activeTab === 'incidents' && 'Track and manage security incidents'}
          {activeTab === 'users' && 'Manage user access and permissions'}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main style={styles.mainContent}>
        <div style={styles.leftPanel}>
          {renderTabContent()}
        </div>
        {renderRightPanel()}
      </main>
    </div>
  );
}