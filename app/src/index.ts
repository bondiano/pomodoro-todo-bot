import * as dotenv from 'dotenv';

import { start } from './bin/bot';

dotenv.config();

start().catch((err) => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(-1);
});
