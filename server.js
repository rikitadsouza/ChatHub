import express from 'express';
import pusherAuth from './src/pusherAuth.js'; // Ensure the correct path
import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Log the FIREBASE_SERVICE_ACCOUNT to check if it's being read correctly
console.log('FIREBASE_SERVICE_ACCOUNT:', process.env.FIREBASE_SERVICE_ACCOUNT);

app.use(express.json());
app.use(pusherAuth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});