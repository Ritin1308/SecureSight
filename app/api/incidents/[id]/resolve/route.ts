// File: app/api/incidents/[id]/resolve/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Make the route dynamic
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const incidentId = parseInt(params.id);

    if (isNaN(incidentId)) {
      return NextResponse.json(
        { error: 'Invalid incident ID' },
        { status: 400 }
      );
    }

    const updatedIncident = await prisma.incident.update({
      where: { id: incidentId },
      data: {
        resolved: true,
        resolvedAt: new Date(),
      },
      include: {
        camera: true,
      },
    });

    const transformedIncident = {
      id: updatedIncident.id,
      type: updatedIncident.type,
      description: updatedIncident.description,
      camera: updatedIncident.camera.name,
      cameraId: updatedIncident.cameraId,
      time: `${updatedIncident.startTime} - ${updatedIncident.endTime} on ${updatedIncident.date}`,
      timestamp: updatedIncident.createdAt,
      thumbnail: updatedIncident.thumbnailUrl || undefined,
      priority: updatedIncident.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'critical',
      resolved: updatedIncident.resolved,
      resolvedAt: updatedIncident.resolvedAt,
      resolvedBy: undefined,
      createdAt: updatedIncident.createdAt,
      updatedAt: updatedIncident.updatedAt,
    };

    return NextResponse.json(transformedIncident);
  } catch (error) {
    console.error('Error resolving incident:', error);
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    );
  }
}