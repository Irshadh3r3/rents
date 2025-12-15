# Deployment Guide

## Prerequisites

1. **MongoDB Atlas** (or local MongoDB)
2. **Vercel Account** (for frontend)
3. **Railway/Render Account** (for backend) OR VPS

## Frontend Deployment (Vercel)

### Option 1: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel deploy --prod
\`\`\`

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as root, do NOT select backend folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   \`\`\`
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   \`\`\`
6. Deploy

**Important Notes:**
- The `backend` folder contains a separate Node.js/Express API and should NOT be deployed to Vercel
- Deploy only the Next.js frontend to Vercel
- Deploy the backend separately to Railway, Render, or a VPS
- The `vercel.json` file ensures Vercel ignores the backend folder

## Backend Deployment (Railway)

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - Root Directory: `backend`
   - Start Command: `npm start`
6. Add Environment Variables:
   \`\`\`
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=production
   \`\`\`
7. Deploy

## MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP (allow all: 0.0.0.0/0 for testing)
5. Get connection string
6. Replace in backend `.env`:
   \`\`\`
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karachi-rides
   \`\`\`

## Environment Variables

### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
\`\`\`

### Backend (.env)
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karachi-rides
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=production
\`\`\`

## Post-Deployment

1. **Create Admin User** (using MongoDB Compass or CLI):
   \`\`\`javascript
   db.users.insertOne({
     name: "Admin",
     phone: "+923001234567",
     role: "admin",
     is_verified: true,
     created_at: new Date()
   })
   \`\`\`

2. **Test OTP Login**:
   - The OTP will be logged in backend console
   - In production, integrate with Firebase or SMS gateway

3. **Update CORS** in backend:
   \`\`\`javascript
   app.use(cors({
     origin: 'https://your-vercel-app.vercel.app'
   }));
   \`\`\`

## Firebase OTP Setup (Production)

1. Create Firebase project
2. Enable Phone Authentication
3. Get service account credentials
4. Add to backend `.env`:
   \`\`\`env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email
   \`\`\`

## WhatsApp Integration

For production WhatsApp notifications:

1. **WhatsApp Business API** - Official but requires approval
2. **Twilio WhatsApp** - Easy integration
3. **WhatsApp Web API** - Unofficial libraries

Example with Twilio:
\`\`\`javascript
import twilio from 'twilio';

const client = twilio(accountSid, authToken);

await client.messages.create({
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+923001234567',
  body: 'Your booking is confirmed!'
});
\`\`\`

## Monitoring

- Use Railway/Render logs for backend monitoring
- Use Vercel Analytics for frontend monitoring
- Set up MongoDB Atlas alerts

## Backup

- MongoDB Atlas automatic backups
- Export data regularly
- Keep local development database copy
