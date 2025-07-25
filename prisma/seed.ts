const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🧹 Cleaning existing data...');
    
    // Clear existing data
    await prisma.incident.deleteMany({});
    await prisma.camera.deleteMany({});

    console.log('📹 Creating cameras...');
    
    // Create cameras
    const camera1 = await prisma.camera.create({
      data: {
        name: 'Shop Floor Camera A',
        location: 'Main Manufacturing Area',
      },
    });

    const camera2 = await prisma.camera.create({
      data: {
        name: 'Vault Camera B',
        location: 'Secure Storage Room B2',
      },
    });

    const camera3 = await prisma.camera.create({
      data: {
        name: 'Entrance Camera C',
        location: 'Main Building Entry',
      },
    });

    console.log('✅ Created 3 cameras');

    console.log('🚨 Creating incidents...');

    // Create incidents
    const incidents = [
      {
        type: 'Unauthorised Access',
        description: 'Detected unauthorized person in restricted area',
        cameraId: camera1.id,
        date: '7-Jul-2025',
        startTime: '14:35',
        endTime: '14:37',
        priority: 'high',
        resolved: false,
        thumbnailUrl: '/thumbnails/thumb1.jpg'
      },
      {
        type: 'Gun Threat',
        description: 'Weapon detected in camera feed',
        cameraId: camera1.id,
        date: '7-Jul-2025',
        startTime: '14:32',
        endTime: '14:34',
        priority: 'critical',
        resolved: false,
        thumbnailUrl: '/thumbnails/thumb2.jpg'
      },
      {
        type: 'Unauthorised Access',
        description: 'Multiple persons entered without authorization',
        cameraId: camera2.id,
        date: '7-Jul-2025', 
        startTime: '13:15',
        endTime: '13:18',
        priority: 'high',
        resolved: false,
        thumbnailUrl: '/thumbnails/thumb3.jpg'
      },
      {
        type: 'Face Recognised',
        description: 'Known person detected on watchlist',
        cameraId: camera3.id,
        date: '6-Jul-2025',
        startTime: '16:30', 
        endTime: '16:32',
        priority: 'medium',
        resolved: true,
        thumbnailUrl: '/thumbnails/thumb1.jpg'
      },
      {
        type: 'Suspicious Activity',
        description: 'Person loitering in restricted zone',
        cameraId: camera2.id,
        date: '6-Jul-2025',
        startTime: '06:50',
        endTime: '06:51', 
        priority: 'medium',
        resolved: true,
        thumbnailUrl: '/thumbnails/thumb2.jpg'
      },
      {
        type: 'Traffic congestion',
        description: 'Heavy traffic detected at entrance',
        cameraId: camera3.id,
        date: '5-Jul-2025',
        startTime: '18:07',
        endTime: '18:13', 
        priority: 'low',
        resolved: true,
        thumbnailUrl: '/thumbnails/thumb3.jpg'
      },
      {
        type: 'Perimeter Breach',
        description: 'Movement detected outside boundary',
        cameraId: camera1.id,
        date: '5-Jul-2025',
        startTime: '02:15',
        endTime: '02:18', 
        priority: 'high',
        resolved: false,
        thumbnailUrl: '/thumbnails/thumb1.jpg'
      },
      {
        type: 'Motion Detected',
        description: 'Unexpected movement in secure area',
        cameraId: camera2.id,
        date: '4-Jul-2025',
        startTime: '23:45',
        endTime: '23:47', 
        priority: 'medium',
        resolved: false,
        thumbnailUrl: '/thumbnails/thumb2.jpg'
      }
    ];

    // Create incidents one by one
    for (let i = 0; i < incidents.length; i++) {
      await prisma.incident.create({
        data: incidents[i],
      });
    }

    const totalIncidents = await prisma.incident.count();
    const unresolvedIncidents = await prisma.incident.count({
      where: { resolved: false }
    });
    const resolvedIncidents = await prisma.incident.count({
      where: { resolved: true }
    });

    console.log('✅ Database seeded successfully');
    console.log(`📹 Created 3 cameras`);
    console.log(`🚨 Created ${totalIncidents} incidents`);
    console.log(`⚠️  Unresolved incidents: ${unresolvedIncidents}`);
    console.log(`✅ Resolved incidents: ${resolvedIncidents}`);

  } catch (error) {
    console.error('❌ Error in seed script:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });