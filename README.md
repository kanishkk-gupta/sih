sih25

PlacementPro - Node/Express + Vanilla JS

Run locally (no Vite):

1. Install Node 18+ and MongoDB.
2. Create `.env` in project root:
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/placementpro
JWT_SECRET=change_me
```
3. Install deps and start:
```
npm install
npm run dev
```
4. Open `http://localhost:3000`.

Auth uses local JSON users (no signup). Demo logins:
- student@demo.com / demo123
- admin@demo.com / demo123
- mentor@demo.com / demo123
- recruiter@demo.com / demo123

MongoDB stores jobs; role-based APIs restrict write access to admin/recruiter.