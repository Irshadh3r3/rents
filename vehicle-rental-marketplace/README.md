# Karachi Rides - Vehicle Rental Marketplace

A managed vehicle rental marketplace for Karachi, Pakistan. This platform connects verified vehicle dealers with customers for weddings, trips, airport transfers, and corporate events.

## Features

- **Phone/OTP Authentication** - No passwords required
- **Admin-Managed Bookings** - All bookings require manual approval
- **Dealer Dashboard** - Vehicle and booking management
- **Customer Interface** - Easy vehicle browsing and booking requests
- **WhatsApp Integration** - Primary communication channel
- **PWA Support** - Installable like a mobile app

## Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- PWA enabled

**Backend:**
- Node.js + Express
- MongoDB
- JWT Authentication
- Firebase (OTP)

## Architecture

This project consists of two separate applications:

1. **Frontend (Next.js)** - Deploy to Vercel
2. **Backend (Express API)** - Deploy to Railway/Render/VPS

The frontend and backend are decoupled and should be deployed separately.

## User Roles

- **Admin** - Full control over dealers, vehicles, and bookings
- **Dealer** - Manage vehicles, drivers, and respond to bookings
- **Customer** - Browse vehicles and request bookings
- **Public** - View available vehicles without login

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Firebase account (for OTP)

### Installation

1. Clone the repository

2. Install frontend dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Install backend dependencies:
   \`\`\`bash
   cd backend
   npm install
   cd ..
   \`\`\`

4. Set up environment variables:
   - Copy `.env.example` to `.env` in root directory
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your configuration values

5. Start MongoDB:
   \`\`\`bash
   mongod
   \`\`\`

6. Start the backend server:
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`

7. Start the frontend (in a new terminal):
   \`\`\`bash
   npm run dev
   \`\`\`

8. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Frontend (Vercel)

\`\`\`bash
vercel deploy
\`\`\`

**Important:** Make sure Root Directory is set to `./` (the project root) in Vercel settings.

### Backend (Railway/Render/VPS)

Deploy the `backend` folder separately. See `DEPLOYMENT.md` for detailed instructions.

## Database Collections

- **users** - User accounts (admin, dealer, customer)
- **dealers** - Dealer business information
- **vehicles** - Vehicle listings with verification
- **drivers** - Driver information linked to vehicles
- **bookings** - Booking requests and confirmations
- **payments** - Payment tracking (Phase 2)
- **disputes** - Issue resolution system

## API Documentation

See `/backend/README.md` for detailed API documentation.

## License

MIT
