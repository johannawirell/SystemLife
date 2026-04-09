import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { checkDatabaseConnection } from './config/db';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';
import { apiRouter } from './modules';
import { store } from './utils/store';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', async (_req, res) => {
  let database = 'disconnected';

  try {
    await checkDatabaseConnection();
    database = 'connected';
  } catch {
    database = 'disconnected';
  }

  res.json({
    status: 'ok',
    database,
    demoToken: store.seedToken,
  });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
