import app from '../../../src/main/config/app';
import request from 'supertest';

describe('contentType', () => {
  it('Should return default content type as json', async () => {
    app.get('/test-content-type', (_req, res) => {
      res.send('');
    });
    await request(app).get('/test-content-type').expect('content-type', /json/);
  });
});
