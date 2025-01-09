// src/config/pusher.js
import Pusher from 'pusher-js';

export const pusherClient = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  encrypted: true,
  authEndpoint: 'http://localhost:3001/pusher/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  }
});

export const initializeChannel = (userId) => {
  return pusherClient.subscribe(`private-${userId}`);
};
