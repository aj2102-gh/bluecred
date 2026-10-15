# BlueCarbon MRV — Hackathon MVP (Prototype)

This lightweight MVP demonstrates the core flow without Docker or Postgres:
- NGO submits project evidence (image + metadata)
- AI verification (mock)
- IPFS evidence CID (mock)
- Admin approval → mock blockchain tx

Run locally (VS Code):
1. Start backend
   cd backend
   npm install
   npm start

2. Start frontend
   cd frontend
   npm install
   npm run dev

Backend runs on http://localhost:5000
Frontend runs on http://localhost:3000
