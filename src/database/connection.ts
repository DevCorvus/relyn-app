import mongoose from 'mongoose';
import { MONGOPATH } from '../utils/env';

export async function databaseConnection() {
  try {
    const db = await mongoose.connect(MONGOPATH);
    console.log('Connected to MongoDB database:', db.connections[0].name);
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
}
