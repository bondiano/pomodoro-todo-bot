import * as mongoose from 'mongoose';

import * as configs from '@/configs';

const { MONGO_DB_PORT, MONGO_DB_URL } = configs.mongodb;
mongoose.connect(`mongodb://${MONGO_DB_URL}:${MONGO_DB_PORT}`, { autoIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // tslint:disable-next-line:no-console
  console.log('MongoDB connected');
});

export default mongoose;
