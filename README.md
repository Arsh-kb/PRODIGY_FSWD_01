📌 PRODIGY_FSWD_01 – Secure User Authentication System
🚀 Project Overview

This project implements a secure authentication system using React (Vite) and Supabase.

It includes:

Email & Password Authentication

Google OAuth Login

GitHub OAuth Login

Password Reset via Email

Protected Routes

Session Persistence

Logout Handling

Email Verification Support

The system ensures secure access control and prevents unauthorized access to protected routes.

🛠 Tech Stack

Frontend: React (Vite)

Backend: Supabase (PostgreSQL + Auth)

Authentication: Supabase Auth (Email + OAuth)

Routing: React Router

UI Animations: Framer Motion

Icons: Lucide React

Notifications: Sonner

🔐 Features
✅ Secure Authentication

User registration with email/password

Login with email/password

OAuth login (Google & GitHub)

✅ Password Recovery

Reset password via email link

Secure password update flow

✅ Protected Dashboard

Only authenticated users can access

Redirects unauthenticated users to login

Prevents back-navigation after logout

✅ Email Verification

Optional email confirmation enabled

Displays verified status

📂 Project Structure
src/
 ├── pages/
 │   ├── Login.jsx
 │   ├── Signup.jsx
 │   ├── Dashboard.jsx
 │   ├── ForgotPassword.jsx
 │   └── ResetPassword.jsx
 ├── supabaseClient.js
 ├── App.jsx
 └── main.jsx

⚙️ Setup Instructions

1️⃣ Clone the repository

git clone https://github.com/Arsh-kb/PRODIGY_FSWD_01.git
cd PRODIGY_FSWD_01


2️⃣ Install dependencies

npm install


3️⃣ Create .env file

VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key


4️⃣ Run locally

npm run dev

🔒 Security Notes

.env file is excluded via .gitignore

Only public anon key is used

No service role keys exposed

OAuth redirect URLs configured in Supabase

📦 Build

To generate production build:

npm run build

🎯 Outcome

This project demonstrates:

Full-stack authentication integration

OAuth provider configuration

Secure route protection

Production-ready build setup