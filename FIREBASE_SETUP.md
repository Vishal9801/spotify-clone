# Firebase Setup for Nidhi Music

This guide will help you set up Firebase Authentication for the Nidhi Music app.

## Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "Nidhi Music")
4. Choose whether to enable Google Analytics (recommended)
5. Complete the project creation process

## Step 2: Set Up Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. In the "Sign-in providers" tab, click on "Email/Password"
4. Toggle "Enable" and click "Save"

## Step 3: Get Your Firebase Configuration

1. Click on the gear icon next to "Project Overview" and select "Project settings"
2. Scroll down to "Your apps" section
3. If no app is listed, click on the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "nidhi-music-web")
5. After registering, you'll see your Firebase configuration (apiKey, authDomain, etc.)

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't already exist)
2. Add your Firebase configuration values to the `.env` file:

```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Important**: Replace the placeholder values with your actual Firebase configuration.

3. The Firebase configuration will automatically be loaded from these environment variables in `src/firebase/index.js`.

4. Make sure to add `.env` to your `.gitignore` file to avoid committing sensitive information to your repository.

## Step 5: Run Your Application

1. Make sure you have installed all dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Navigate to the login or register page to test authentication

## Environment Variables in Vite

This project uses Vite as its build tool, which automatically loads environment variables from `.env` files. Variables prefixed with `VITE_` are exposed to your Vue code via `import.meta.env.VITE_VARIABLE_NAME`.

## Troubleshooting

If you encounter any issues:

1. Make sure you've correctly set all environment variables in the `.env` file
2. Ensure Email/Password authentication is enabled in your Firebase project
3. Check the browser console for specific error messages
4. Clear browser cache and cookies if you're testing locally
5. Restart the development server after making changes to the `.env` file

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Vite Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Web Setup Guide](https://firebase.google.com/docs/web/setup) 