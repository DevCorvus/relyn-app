import mongoose from 'mongoose';
import { removeExpiredTokens } from '../utils/database';
import { MONGOPATH } from '../utils/env';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// const URI: string = process.env.MONGOPATH as string;
const URI = MONGOPATH;

(async function connectDatabase(attemps: number = 1) {
  console.log('Connecting to Database...');
  try {
    const db = await mongoose.connect(URI);
    console.log('Connected to MongoDB database:', db.connections[0].name);
    try {
      await removeExpiredTokens();
      const dayInMs: number = 86400000;
      setInterval(async () => {
        await removeExpiredTokens();
      }, dayInMs);
    } catch (err) {
      console.log('Cannot remove expired tokens');
    }
  } catch (err) {
    console.log('Error connecting to Database:');
    console.error(err);
    if (attemps <= 3) {
      console.log(`Retrying to connect in 10 sec... Attemp #${attemps}`);
      setTimeout(() => connectDatabase(attemps + 1), 10000);
    } else {
      console.log('Maximum attempts to reconnect achieved.');
      console.log('Server Shutdown...');
      process.exit(1);
    }
  }
})();
