# Firebase Realtime Database App with Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that implements a Firebase Realtime Database integration for data management.

## Features

- Real-time data synchronization with Firebase
- Form inputs for API call, path, phone number, and message
- Live display of database results
- Clean and responsive UI with Tailwind CSS
- TypeScript support for better development experience

## Getting Started

First, set up your environment variables by creating a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

```

Then, run the development server:

```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The main components of the application are:

- `app/page.tsx` - The main component containing the form and results display
- `app/layout.tsx` - The root layout component with metadata and styling


## Firebase Setup

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database in your Firebase project
3. Copy your Firebase configuration to the environment variables
4. Set up the database rules according to your security requirements

## Realtime Database Structure
```bash
Root
├── MAC address 1
│   ├── api_call
│   ├── path
|   ├── phoneNumber
|   ├── result
│   └── messege
├── MAC address 2
│   ├── api_call
│   ├── path
|   ├── phoneNumber
|   ├── result
│   └── messege
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase features
- [Tailwind CSS](https://tailwindcss.com/docs) - learn about Tailwind CSS styling


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a Git repository
2. Import your project to Vercel
3. Add your Firebase environment variables in the Vercel project settings
4. Deploy!


Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.