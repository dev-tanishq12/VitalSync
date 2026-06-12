# VitalSync 🧬

**Elite Health Optimizer for High-Performance Living**

VitalSync is a premium, modern health and biometric tracking application built with Next.js and Firebase. It provides users with a comprehensive ecosystem to seamlessly track daily activities, sleep, hydration, and nutrition. Engineered with a sleek "glassmorphism" aesthetic and interactive UI, VitalSync is designed for users who want clinical-grade precision in optimizing their daily readiness and performance.

---

## 🚀 Features

- **Dynamic Dashboard**: View real-time readiness scores, weekly activity trends, and daily targets all in one place.
- **Biometric Tracking**: Manually log and monitor vital health metrics including:
  - 🚶‍♂️ Steps
  - 💤 Sleep Duration & Quality
  - ❤️ Heart Rate (Resting & Active)
  - 🔥 Calories Burned
  - 💧 Hydration
- **Goal Management**: Set custom, trackable health goals and see your progress bar fill up as you log your daily activities.
- **Device Ecosystem Integration**: Connect and synchronize data from popular wearables (Apple Health, Fitbit, Garmin, WHOOP, Peloton).
- **Gamified Challenges**: Participate in community challenges, unlock elite badges, and push your physical limits.
- **Secure Authentication**: Built-in Google and Email/Password authentication powered by Firebase Auth.

---

## 💻 Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Icons**: [Google Material Symbols](https://fonts.google.com/icons)

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js (v18+) installed on your local machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/VitalSync.git
   cd VitalSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root of the project and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   FIREBASE_CLIENT_EMAIL=your_firebase_admin_client_email
   FIREBASE_PRIVATE_KEY="your_firebase_admin_private_key"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

VitalSync is optimized for seamless deployment on [Vercel](https://vercel.com/). Connect your GitHub repository to Vercel, securely add your environment variables in the project settings, and deploy with a single click.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
