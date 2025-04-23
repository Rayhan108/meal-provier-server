import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import morgan from 'morgan';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(morgan("dev"))
app.get('/', (req: Request, res: Response) => {
  res.send('Car Store Server is Running...');
});
app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
