import app from '@main/config/app';
import request from 'supertest';

describe('CORS Middleware', () => {
  it('Should enable cors', async () => {
    app.get('/test-cors', (_req, res) => {
      res.send();
    });

    await request(app)
      .get('/test-cors')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Method', '*')
      .expect('Access-Control-Allow-Headers', '*');
  });
});
