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
   \`\`\`

4. Set up environment variables:
   - Copy `.env.example` to `.env`
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

7. Start the frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

8. Open [http://localhost:3000](http://localhost:3000)

## Database Collections

- **users** - User accounts (admin, dealer, customer)
- **dealers** - Dealer business information
- **vehicles** - Vehicle listings with verification
- **drivers** - Driver information linked to vehicles
- **bookings** - Booking requests and confirmations
- **payments** - Payment tracking (Phase 2)
- **disputes** - Issue resolution system

## Deployment

**Frontend (Vercel):**
\`\`\`bash
vercel deploy
\`\`\`

**Backend (Railway/VPS):**
- Configure MongoDB connection
- Set environment variables
- Deploy using Railway CLI or manual VPS setup

## API Documentation

See `/backend/README.md` for detailed API documentation.

## License

MIT
