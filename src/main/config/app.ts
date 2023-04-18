import express from 'express';
import setupRoute from '@main/config/routes';
import setupMiddleware from '@main/config/middleware';

const app = express();
setupRoute(app);
setupMiddleware(app);
export default app;
