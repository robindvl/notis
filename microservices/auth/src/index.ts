import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://notis_user:notis_password@127.0.0.1:27018/notis_auth?authSource=admin';

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`[AuthService] Running on port ${PORT} (${process.env.USE_MEMORY === 'true' ? 'Memory' : 'Mongoose'} mode)`);
  });
};

if (process.env.USE_MEMORY === 'true') {
  startServer();
} else {
  mongoose.connect(MONGO_URI, {
    directConnection: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
      startServer();
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });
}

