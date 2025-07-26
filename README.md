# 🔒 SecureSight Dashboard

SecureSight is a fictional CCTV monitoring platform designed to manage up to 3 real-time video feeds. It detects and flags security threats like unauthorized access, weapon presence, and facial recognition matches.

This project is a technical assessment that focuses on building a responsive **dashboard interface** with a connected backend for managing and resolving incidents.

---

## 🚀 Features

- 🔎 **Incident Detection View**  
  Left-side panel shows the selected incident’s video thumbnail or placeholder.

- 📋 **Incident List**  
  Right-side sidebar displays a scrollable list of flagged events with:
  - Threat type icon
  - Camera location
  - Timestamp
  - “Resolve” button with optimistic UI updates

- 🧭 **Top Navigation Bar**

- ✅ **Optimistic API Actions**  
  Incidents can be resolved with immediate UI feedback.

---

## 🧱 Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Frontend     | [Next.js 15 (App Router)](https://nextjs.org/docs) |
| Styling      | [Tailwind CSS](https://tailwindcss.com) |
| Backend/API  | Built-in Next.js API routes     |
| Database     | SQLite (via [Prisma ORM](https://www.prisma.io/)) |
| Seed Script  | TypeScript-based Prisma seeding |
| Deployment   | Local (can be deployed to Vercel/Supabase) |

---

## 📸 Data Models

```ts
// prisma/schema.prisma

model Camera {
  id        Int        @id @default(autoincrement())
  name      String
  location  String
  incidents Incident[]
}

model Incident {
  id           Int      @id @default(autoincrement())
  cameraId     Int
  camera       Camera   @relation(fields: [cameraId], references: [id])
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
}

## 📷 Screenshots

### 🗂️ Dashboard

C:\Users\ritin\Desktop\securesight-dashboard\screenshots\dashboard.png

### 🗂️ Camera
C:\Users\ritin\Desktop\securesight-dashboard\screenshots\camera.png


### 🗂️ Incidents

C:\Users\ritin\Desktop\securesight-dashboard\screenshots\incidents.png



