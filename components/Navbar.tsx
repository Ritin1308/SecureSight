'use client';

import React from 'react';
import { Grid3X3, Camera, Eye, AlertTriangle, Users } from 'lucide-react';
import { NavbarProps } from '@/types';

const styles = {
  navbar: { backgroundColor: '#1f2937', borderBottom: '1px solid #374151', padding: '16px 24px', position: 'sticky' as const, top: 0, zIndex: 50, height: '80px' },
  navContent: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' },
  leftSection: { display: 'flex', alignItems: 'center', gap: '32px' },
  logo: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  logoText: { fontSize: '24px', fontWeight: 'bold', color: 'white', letterSpacing: '0.05em' },
  nav: { display: 'flex', alignItems: 'center', gap: '32px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', color: '#d1d5db', fontWeight: '500' },
  navItemActive: { color: '#facc15', backgroundColor: 'rgba(250, 204, 21, 0.1)' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(55, 65, 81, 0.5)', padding: '8px 16px', borderRadius: '8px' },
  userAvatar: { width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: 'white' },
  userInfo: { textAlign: 'right' as const },
  userName: { fontSize: '14px', fontWeight: '600', color: 'white' },
  userEmail: { fontSize: '12px', color: '#9ca3af' }
};

export default function Navbar({ activeTab = 'dashboard', onTabChange }: NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid3X3 },
    { id: 'cameras', label: 'Cameras', icon: Camera },
    { id: 'scenes', label: 'Scenes', icon: Eye },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <header style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.leftSection}>
          <div style={styles.logo}><div style={styles.logoIcon}><span>M</span></div><span style={styles.logoText}>MANDLACX</span></div>
          <nav style={styles.nav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  style={isActive ? {...styles.navItem, ...styles.navItemActive} : styles.navItem}
                  onClick={() => onTabChange?.(item.id)}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                ><Icon size={18} /><span>{item.label}</span></div>
              );
            })}
          </nav>
        </div>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}><span>MA</span></div>
          <div style={styles.userInfo}><div style={styles.userName}>Ritin Panwar</div><div style={styles.userEmail}>ritin@mandlac.com</div></div>
        </div>
      </div>
    </header>
  );
}