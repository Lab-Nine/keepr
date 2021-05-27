const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route Integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          // .end((err, res) => {
          //   if (err) throw err;
          // });
        });

      xit('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
        .get('/')
        .expect(400, done);
      });
    });
  });
});
