import express from 'express';
import Pusher from 'pusher';
import admin from 'firebase-admin';
import process from 'process';

const router = express.Router();

// Log the FIREBASE_SERVICE_ACCOUNT to check if it's being read correctly
console.log('FIREBASE_SERVICE_ACCOUNT:', process.env.FIREBASE_SERVICE_ACCOUNT);

try {
  // Initialize Firebase Admin SDK
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<your-database-name>.firebaseio.com"
  });

  const pusher = new Pusher({
    appId: process.env.VITE_PUSHER_APP_ID,
    key: process.env.VITE_PUSHER_APP_KEY,
    secret: process.env.VITE_PUSHER_APP_SECRET,
    cluster: process.env.VITE_PUSHER_APP_CLUSTER,
    useTLS: true
  });

  // Example route using pusher
  router.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });

} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

export default router;