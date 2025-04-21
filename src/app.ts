import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5000'], credentials: true }));
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Car Store Server is Running...');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
