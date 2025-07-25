// File: pages/api/incidents/[id]/resolve.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '.prisma/client'; // Make sure this path is correct

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Ensure this is a PATCH request
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 2. Get the incident ID from the query
    const incidentId = parseInt(req.query.id as string);

    if (isNaN(incidentId)) {
      return res.status(400).json({ error: 'Invalid incident ID' });
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

    // Transform data to match frontend TypeScript interface
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
    
    // 3. Send the response using the `res` object
    return res.status(200).json(transformedIncident);
  } catch (error) {
    console.error('Error resolving incident:', error);
    return res.status(500).json({ error: 'Failed to resolve incident' });
  }
}