import app from '@main/config/app';
import request from 'supertest';

describe('ContentType Middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test-content-type', (_req, res) => {
      res.send('');
    });
    await request(app).get('/test-content-type').expect('content-type', /json/);
  });

  it('Should return xml content when force', async () => {
    app.get('/test-content-type-xml', (_req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(app).get('/test-content-type-xml').expect('content-type', /xml/);
  });
});
