import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

// Add this line to tell Next.js this route should be dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');
    
    const incidents = await prisma.incident.findMany({
      include: {
        camera: true
      },
      where: resolved !== null ? {
        resolved: resolved === 'true'
      } : undefined,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform data to match frontend TypeScript interface
    interface Camera {
      id: number;
      name: string;
      // Add other camera fields if needed
    }

    interface Incident {
      id: number;
      type: string;
      description: string | null;
      cameraId: number;
      camera: Camera;
      startTime: string;
      endTime: string;
      date: string;
      createdAt: Date;
      updatedAt: Date;
      thumbnailUrl?: string | null;
      priority: string;
      resolved: boolean;
      resolvedAt?: Date | null;
    }

    interface TransformedIncident {
      id: number;
      type: string;
      description: string;
      camera: string;
      cameraId: number;
      time: string;
      timestamp: Date;
      thumbnail?: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
      resolved: boolean;
      resolvedAt?: Date | null;
      resolvedBy?: string;
      createdAt: Date;
      updatedAt: Date;
    }

    const transformedIncidents: TransformedIncident[] = incidents.map((incident: Incident): TransformedIncident => ({
      id: incident.id,
      type: incident.type,
      description: incident.description ?? '',
      camera: incident.camera.name,
      cameraId: incident.cameraId,
      time: `${incident.startTime} - ${incident.endTime} on ${incident.date}`,
      timestamp: incident.createdAt,
      thumbnail: incident.thumbnailUrl || undefined,
      priority: incident.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'critical',
      resolved: incident.resolved,
      resolvedAt: incident.resolvedAt,
      resolvedBy: undefined, // You can add this field to your schema if needed
      createdAt: incident.createdAt,
      updatedAt: incident.updatedAt
    }));

    return NextResponse.json(transformedIncidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
}