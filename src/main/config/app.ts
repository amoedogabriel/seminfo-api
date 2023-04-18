import express from 'express';
import setupRoute from './routes';
import setupMiddleware from './middleware';

const app = express();
setupRoute(app);
setupMiddleware(app);
export default app;
