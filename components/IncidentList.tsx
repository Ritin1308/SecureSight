'use client';

import React from 'react';
import { AlertTriangle, Clock, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { IncidentListProps } from '@/types';

// Using the refined styles from layout.tsx for the "perfect" UI
const styles = {
  container: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' as const, backgroundColor: '#1f2937' },
  header: { padding: '24px 24px 16px 24px', borderBottom: '1px solid #374151' },
  headerTitle: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  incidentCount: { fontSize: '20px', fontWeight: 'bold', color: 'white' },
  statusIndicators: { display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px' },
  statusItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  statusDot: { width: '12px', height: '12px', borderRadius: '50%' },
  resolvedStatus: { display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80' },
  incidentList: { flex: 1, overflowY: 'auto' as const },
  incidentItem: { padding: '12px 16px', borderBottom: '1px solid #374151', transition: 'background-color 0.2s', cursor: 'pointer' },
  incidentContent: { display: 'flex', gap: '12px' },
  thumbnail: { width: '70px', height: '56px', backgroundColor: '#4b5563', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  incidentDetails: { flex: 1, minWidth: 0 },
  incidentTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' },
  priorityBadge: { padding: '4px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 'bold', border: '1px solid', display: 'flex', alignItems: 'center', gap: '4px' },
  resolveButton: { color: '#facc15', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', transition: 'all 0.2s', cursor: 'pointer', border: 'none', backgroundColor: 'transparent' },
  incidentMeta: { display: 'flex', flexDirection: 'column' as const, gap: '6px' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#d1d5db' },
  resolvedBadge: { marginTop: '8px', color: '#4ade80', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(20, 83, 45, 0.2)', padding: '3px 6px', borderRadius: '4px' }
};

export default function IncidentList({ incidents = [], onResolve }: IncidentListProps) {
  const unresolvedCount = incidents.filter(i => !i.resolved).length;
  const resolvedCount = incidents.filter(i => i.resolved).length;

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case 'critical': return { color: '#f87171', backgroundColor: 'rgba(127, 29, 29, 0.2)', borderColor: '#f87171' };
      case 'high': return { color: '#fb923c', backgroundColor: 'rgba(154, 52, 18, 0.2)', borderColor: '#fb923c' };
      case 'medium': return { color: '#facc15', backgroundColor: 'rgba(113, 63, 18, 0.2)', borderColor: '#facc15' };
      case 'low': return { color: '#60a5fa', backgroundColor: 'rgba(30, 58, 138, 0.2)', borderColor: '#60a5fa' };
      default: return { color: '#9ca3af', backgroundColor: 'rgba(75, 85, 99, 0.2)', borderColor: '#9ca3af' };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <AlertTriangle size={24} style={{ color: '#f87171' }} />
          <span style={styles.incidentCount}>{unresolvedCount} Unresolved Incidents</span>
        </div>
        <div style={styles.statusIndicators}>
          <div style={styles.statusItem}><div style={{...styles.statusDot, backgroundColor: '#fb923c'}}></div><AlertTriangle size={12} style={{ color: '#fb923c' }} /></div>
          <div style={styles.statusItem}><div style={{...styles.statusDot, backgroundColor: '#60a5fa'}}></div><span style={{ color: '#60a5fa', fontSize: '18px' }}>👤</span></div>
          <div style={styles.resolvedStatus}><CheckCircle size={16} /><span>+ {resolvedCount} resolved</span></div>
        </div>
      </div>

      <div style={styles.incidentList}>
        {incidents.map((incident) => (
          <div 
            key={incident.id} 
            style={{ ...styles.incidentItem, opacity: incident.resolved ? 0.6 : 1 }}
            onMouseEnter={(e) => { if (!incident.resolved) e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <div style={styles.incidentContent}>
              <div style={styles.thumbnail}><Camera size={18} style={{ color: '#9ca3af' }} /></div>
              <div style={styles.incidentDetails}>
                <div style={styles.incidentTop}>
                  <div style={{ ...styles.priorityBadge, ...getPriorityColors(incident.priority) }}>
                    {incident.priority === 'critical' ? <AlertCircle size={14} /> : <AlertTriangle size={14} />}
                    <span>{incident.type}</span>
                  </div>
                  {!incident.resolved && (
                    <button 
                      style={styles.resolveButton}
                      onClick={(e) => { e.stopPropagation(); onResolve?.(incident.id); }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fde047'; e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#facc15'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      Resolve →
                    </button>
                  )}
                </div>
                <div style={styles.incidentMeta}>
                  <div style={styles.metaItem}><Camera size={12} /><span>{incident.camera}</span></div>
                  <div style={{...styles.metaItem, color: '#9ca3af'}}><Clock size={12} /><span>{incident.time}</span></div>
                </div>
                {incident.resolved && (
                  <div style={styles.resolvedBadge}><CheckCircle size={12} /><span>Resolved</span></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}