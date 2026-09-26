<div align="center">
  <img src="client/public/seo-banner.jpg" alt="Rakshak Paws Foundation Banner" width="100%" />

  # 🐾 Rakshak Paws Foundation

  **A Premium MERN-Stack Animal Rescue & Fundraising Platform**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
  [![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](#)
</div>

## 📖 Overview

Rakshak Paws Foundation is a full-stack, enterprise-grade web application built to facilitate animal rescues, manage fundraising campaigns, and process donations. The platform features a highly immersive, cinematic user interface for donors, and a secure, powerful dashboard for administrators to manage operations.

## ✨ Features

### Public Platform (Donors & Supporters)
*   **Immersive UI/UX**: Cinematic animations using Framer Motion, glassmorphism design, and a premium color palette.
*   **Campaign Discoverability**: View urgent medical and rescue campaigns.
*   **Seamless Donations**: Integrated with Razorpay for Card, UPI, and NetBanking payments.
*   **Dynamic SEO**: Automatically updates Open Graph and Twitter meta tags based on the active campaign, ensuring beautiful preview cards when links are shared on social media.
*   **Gallery**: Browse heartwarming rescue stories and success photos.
*   **Responsive**: Fully responsive design across Desktop, Tablet, and Mobile.

### Admin Dashboard (Operations)
*   **Secure Authentication**: JWT-based protected routes and HTTP-only cookies.
*   **Campaign Management**: Create, edit, and delete campaigns using a 3-step interactive modal wizard.
*   **Donation Tracking**: Monitor all incoming donations and track campaign funding progress in real-time.
*   **Gallery Management**: Upload and curate images for the public gallery.
*   **Background Jobs**: Integrated with BullMQ & Redis to process automated post-donation PDF receipts and emails asynchronously.

## 🛠️ Tech Stack

**Frontend (Client)**
*   React.js + Vite
*   Tailwind CSS (Vanilla Customizations)
*   Framer Motion (Animations)
*   React Router DOM (Routing)
*   React Toastify (Notifications)
*   Zustand / Context API (State Management)

**Backend (Server)**
*   Node.js + Express.js
*   MongoDB + Mongoose (Database & ODM)
*   Razorpay SDK (Payment Gateway)
*   BullMQ + Redis (Background Jobs)
*   Zod (Request Validation)
*   JSON Web Tokens (JWT Authentication)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas Cluster)
*   Redis (Local or Upstash)
*   Razorpay Test Credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/rakshak-paws.git
   cd rakshak-paws
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Environment Configuration

Create a `.env` file in both the `server` and `client` directories.

**server/.env**
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### Running the App Locally

Start the **Backend Server**:
```bash
cd server
npm run dev
```

Start the **Frontend Client**:
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🔐 Admin Access

To access the secure Admin Dashboard, visit `http://localhost:5173/admin/login`.

**Test Administrator Credentials:**
*   **Email / Username:** `admin`
*   **Password:** `password123`

*(Note: In production, ensure these default credentials are changed or seed scripts are updated.)*

## 📂 Architecture & Directory Structure

```text
📦 rakshak-paws
 ┣ 📂 client                 # React Frontend (Vite)
 ┃ ┣ 📂 public               # Static assets & SEO images
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components         # Reusable UI components & Modals
 ┃ ┃ ┣ 📂 pages              # Main views (Home, Campaigns, Admin)
 ┃ ┃ ┣ 📂 context            # Global Auth/Admin State
 ┃ ┃ ┗ 📜 theme.js           # Centralized Design System tokens
 ┃ ┗ 📜 vite.config.js       # Vite configuration & proxy settings
 ┃
 ┗ 📂 server                 # Node.js Backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 controllers        # Route handlers (Auth, Campaigns, Donations)
 ┃ ┃ ┣ 📂 models             # Mongoose schemas
 ┃ ┃ ┣ 📂 routes             # Express router definitions
 ┃ ┃ ┣ 📂 validators         # Zod schemas for strict request validation
 ┃ ┃ ┗ 📂 workers            # BullMQ background jobs (Email & PDFs)
 ┃ ┗ 📜 app.ts               # Express app setup & middleware
```

## 📄 License

This project is licensed under the MIT License.
