import app from '@main/config/app';
import request from 'supertest';

describe('BodyParser Middleware', () => {
  it('Should parse body as json ', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Breno Gonzaga' })
      .expect({ name: 'Breno Gonzaga' });
  });
});
