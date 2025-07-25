'use client';

import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward, Camera } from 'lucide-react';
import { IncidentPlayerProps } from '@/types';

const styles = {
  container: {
    height: '100%',
    backgroundColor: '#1f2937',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  videoArea: {
    position: 'relative' as const,
    height: '66.67%',
    backgroundColor: 'black'
  },
  timestamp: {
    position: 'absolute' as const,
    top: '16px',
    left: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
    zIndex: 10
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    position: 'relative' as const
  },
  mainContent: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayText: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '72px',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    letterSpacing: '0.1em',
    textAlign: 'center' as const,
    zIndex: 5
  },
  backgroundPattern: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.1) 10px,
      rgba(255, 255, 255, 0.1) 20px
    )`
  },
  cameraLabel: {
    position: 'absolute' as const,
    bottom: '16px',
    left: '16px',
    zIndex: 10
  },
  cameraLabelContent: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500'
  },
  pulsingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  previewCameras: {
    position: 'absolute' as const,
    bottom: '16px',
    right: '16px',
    display: 'flex',
    gap: '8px',
    zIndex: 10
  },
  previewCamera: {
    position: 'relative' as const,
    width: '112px',
    height: '80px',
    backgroundColor: '#374151',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  previewCameraActive: {
    position: 'relative' as const,
    width: '112px',
    height: '80px',
    backgroundColor: '#374151',
    borderRadius: '4px',
    border: '2px solid #facc15',
    overflow: 'hidden'
  },
  previewContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const
  },
  previewContentActive: {
    background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)'
  },
  previewContentInactive: {
    background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
  },
  previewText: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'white'
  },
  previewLabel: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    fontSize: '12px',
    textAlign: 'center' as const,
    padding: '4px',
    fontWeight: '500'
  },
  controlsSection: {
    height: '33.33%',
    backgroundColor: '#1f2937',
    padding: '24px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  controlButton: {
    padding: '8px',
    borderRadius: '50%',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white'
  },
  playButton: {
    padding: '16px',
    backgroundColor: 'white',
    color: '#1f2937',
    borderRadius: '50%',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  timelineSection: {
    marginBottom: '24px'
  },
  timelineInfo: {
    textAlign: 'center' as const,
    color: 'white',
    marginBottom: '12px',
    fontFamily: 'monospace'
  },
  timelineRuler: {
    position: 'relative' as const,
    backgroundColor: '#374151',
    height: '48px',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  timelineGrid: {
    display: 'flex',
    height: '100%'
  },
  timelineHour: {
    flex: 1,
    borderRight: '1px solid #4b5563',
    position: 'relative' as const
  },
  hourLabel: {
    position: 'absolute' as const,
    bottom: '4px',
    left: '4px',
    fontSize: '12px',
    color: '#9ca3af',
    fontFamily: 'monospace'
  },
  currentTimeIndicator: {
    position: 'absolute' as const,
    top: 0,
    left: '33%',
    width: '4px',
    height: '100%',
    backgroundColor: '#facc15',
    borderRadius: '2px'
  },
  cameraListSection: {
    color: 'white'
  },
  cameraListTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  cameraList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  cameraItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cameraItemActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: '#374151',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
  },
  cameraInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  cameraStatus: {
    width: '8px',
    height: '8px',
    backgroundColor: '#4ade80',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  cameraStatusBadge: {
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid'
  }
};

export default function IncidentPlayer({ cameras = [], selectedCamera = 'Camera - 01', onCameraSelect }: IncidentPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('03:12:37');
  const [currentDate] = useState('11/7/2025 - 03:12:37');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const [hours, minutes, seconds] = prevTime.split(':').map(Number);
          let totalSeconds = hours * 3600 + minutes * 60 + seconds + playbackSpeed;
          
          if (totalSeconds >= 86400) totalSeconds = 0;
          
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSecs = totalSeconds % 60;
          
          return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')}`;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const defaultCameras = [
    { id: 'Camera - 01', status: 'Unauthorised Access', statusColor: 'orange' as const },
    { id: 'Camera - 02', status: 'Face Recognised', statusColor: 'blue' as const },
    { id: 'Camera - 03', status: 'Traffic congestion', statusColor: 'cyan' as const }
  ];

  const cameraList = cameras.length > 0 ? cameras : defaultCameras;

  const getStatusColors = (color: string) => {
    switch (color) {
      case 'orange':
        return { color: '#fb923c', backgroundColor: 'rgba(154, 52, 18, 0.2)', borderColor: '#fb923c' };
      case 'blue':
        return { color: '#60a5fa', backgroundColor: 'rgba(30, 58, 138, 0.2)', borderColor: '#60a5fa' };
      case 'cyan':
        return { color: '#22d3ee', backgroundColor: 'rgba(22, 78, 99, 0.2)', borderColor: '#22d3ee' };
      case 'red':
        return { color: '#f87171', backgroundColor: 'rgba(127, 29, 29, 0.2)', borderColor: '#f87171' };
      default:
        return { color: '#9ca3af', backgroundColor: 'rgba(75, 85, 99, 0.2)', borderColor: '#9ca3af' };
    }
  };

  const generateTimeline = () => {
    const hours = [];
    for (let i = 0; i <= 16; i++) {
      const hour = String(i).padStart(2, '0') + ':00';
      hours.push(hour);
    }
    return hours;
  };

  const timelineHours = generateTimeline();
  const currentHour = 3; // 03:00

  const handleSkipBack = () => {
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    const totalSeconds = Math.max(0, hours * 3600 + minutes * 60 + seconds - 10);
    const newHours = Math.floor(totalSeconds / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSecs = totalSeconds % 60;
    setCurrentTime(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')}`);
  };

  const handleSkipForward = () => {
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds + 10;
    const newHours = Math.floor(totalSeconds / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSecs = totalSeconds % 60;
    setCurrentTime(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')}`);
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 1, 1.5, 2, 4];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleCameraSelect = (cameraId: string) => {
    if (onCameraSelect) {
      onCameraSelect(cameraId);
    }
  };

  const handleControlHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#374151';
  };

  const handleControlLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handlePlayHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#f3f4f6';
  };

  const handlePlayLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'white';
  };

  const handleCameraItemHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.dataset.active) {
      e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
    }
  };

  const handleCameraItemLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.dataset.active) {
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  return (
    <div style={styles.container}>
      {/* Main Video Area */}
      <div style={styles.videoArea}>
        {/* Timestamp overlay */}
        <div style={styles.timestamp}>
          {currentDate}
        </div>
        
        {/* Main video feed placeholder */}
        <div style={styles.videoPlaceholder}>
          <div style={styles.mainContent}>
            <div style={styles.overlayText}>
              RECORDING
            </div>
            <div style={styles.backgroundPattern} />
          </div>
        </div>

        {/* Camera label */}
        <div style={styles.cameraLabel}>
          <div style={styles.cameraLabelContent}>
            <div style={styles.pulsingDot}></div>
            <span>{selectedCamera}</span>
          </div>
        </div>

        {/* Small preview cameras */}
        <div style={styles.previewCameras}>
          <div style={styles.previewCameraActive}>
            <div style={{
              ...styles.previewContent,
              ...styles.previewContentActive
            }}>
              <div style={styles.previewText}>
                CAM 01
              </div>
            </div>
            <div style={{...styles.previewLabel, color: '#facc15'}}>
              Camera - 01
            </div>
          </div>
          <div style={styles.previewCamera}>
            <div style={{
              ...styles.previewContent,
              ...styles.previewContentInactive
            }}>
              <div style={styles.previewText}>
                CAM 02
              </div>
            </div>
            <div style={{...styles.previewLabel, color: 'white'}}>
              Camera - 02
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div style={styles.controlsSection}>
        {/* Control buttons */}
        <div style={styles.controls}>
          <button 
            style={styles.controlButton}
            onClick={handleSkipBack}
            onMouseEnter={handleControlHover}
            onMouseLeave={handleControlLeave}
          >
            <SkipBack size={20} />
          </button>
          <button 
            style={styles.controlButton}
            onClick={() => setCurrentTime('00:00:00')}
            onMouseEnter={handleControlHover}
            onMouseLeave={handleControlLeave}
          >
            <RotateCcw size={20} />
          </button>
          <button 
            style={styles.playButton}
            onClick={() => setIsPlaying(!isPlaying)}
            onMouseEnter={handlePlayHover}
            onMouseLeave={handlePlayLeave}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button 
            style={styles.controlButton}
            onClick={handleSkipForward}
            onMouseEnter={handleControlHover}
            onMouseLeave={handleControlLeave}
          >
            <SkipForward size={20} />
          </button>
          <button 
            style={styles.controlButton}
            onClick={handleSpeedChange}
            onMouseEnter={handleControlHover}
            onMouseLeave={handleControlLeave}
          >
            <FastForward size={20} />
          </button>
        </div>

        {/* Timeline */}
        <div style={styles.timelineSection}>
          <div style={styles.timelineInfo}>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>{currentTime}</span>
            <span style={{ color: '#9ca3af', marginLeft: '8px' }}>(15-Jun-2025)</span>
            <span 
              style={{ 
                color: '#9ca3af', 
                marginLeft: '8px', 
                cursor: 'pointer',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'rgba(156, 163, 175, 0.1)'
              }}
              onClick={handleSpeedChange}
            >
              {playbackSpeed}x
            </span>
            <span style={{ 
              marginLeft: '16px', 
              backgroundColor: isPlaying ? '#dc2626' : '#d97706', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '4px', 
              fontSize: '14px', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'RECORDING' : 'LIVE'}
            </span>
          </div>
          
          {/* Timeline ruler */}
          <div style={styles.timelineRuler}>
            <div style={styles.timelineGrid}>
              {timelineHours.map((hour, index) => (
                <div key={hour} style={styles.timelineHour}>
                  <div style={styles.hourLabel}>
                    {hour}
                  </div>
                  {/* Current time indicator */}
                  {index === currentHour && (
                    <div style={styles.currentTimeIndicator}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Camera List */}
        <div style={styles.cameraListSection}>
          <h3 style={styles.cameraListTitle}>
            <Camera size={18} />
            Camera List
          </h3>
          <div style={styles.cameraList}>
            {cameraList.map((camera) => (
              <div 
                key={camera.id}
                style={selectedCamera === camera.id ? styles.cameraItemActive : styles.cameraItem}
                data-active={selectedCamera === camera.id}
                onClick={() => handleCameraSelect(camera.id)}
                onMouseEnter={handleCameraItemHover}
                onMouseLeave={handleCameraItemLeave}
              >
                <div style={styles.cameraInfo}>
                  <div style={styles.cameraStatus}></div>
                  <Camera size={16} style={{ color: '#9ca3af' }} />
                  <span style={{ color: 'white', fontWeight: '500' }}>{camera.id}</span>
                </div>
                <div style={{
                  ...styles.cameraStatusBadge,
                  ...getStatusColors(camera.statusColor)
                }}>
                  {camera.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
} 