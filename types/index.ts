export interface Incident {
  id: number;
  type: string;
  camera: string;
  time: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  resolved: boolean;
  thumbnail?: string;
}

export interface Camera {
  id: string;
  status: string;
  statusColor: 'orange' | 'blue' | 'cyan' | 'red' | 'gray';
}

export interface IncidentListProps {
  incidents: Incident[];
  onResolve?: (incidentId: number) => void;
}

export interface IncidentPlayerProps {
  cameras?: Camera[];
  selectedCamera?: string;
  onCameraSelect?: (cameraId: string) => void;
}

export interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export type TabType = 'dashboard' | 'cameras' | 'scenes' | 'incidents' | 'users';