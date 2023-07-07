import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';

describe('e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /health/ping', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/health/ping')
        .expect(200)
        .expect({ status: 'OK' });
    });
  });

  describe('GET /api/v1/listing', () => {
    it('should return 200 with results', () =>
      request(app.getHttpServer())
        .get('/api/v1/listing')
        .set({
          authorization: 'valid-token',
        })
        .expect((res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                agreedToTermsAndConditions: true,
              }),
            ]),
          );
        }));

    it('should return 403 without valid token', () =>
      request(app.getHttpServer())
        .get('/api/v1/listing')
        .set({ authorization: 'oops' })
        .expect(403));

    it('should return 403 without token', () =>
      request(app.getHttpServer()).get('/api/v1/listing').expect(403));
  });

  describe('POST /api/v1/listing', () => {
    const body = {
      createdBy: 'garry',
      name: 'My listing',
      description: 'bla',
      travelOptionId: 'any',
      agreedToTermsAndConditions: true,
    };

    it('should return 201 with id of the new listing', () =>
      request(app.getHttpServer())
        .post('/api/v1/listing')
        .set({
          authorization: 'valid-token',
        })
        .send(body)
        .expect((res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.id).toMatch(/.+/);
        }));

    it('should return 403 without valid token', () =>
      request(app.getHttpServer())
        .post('/api/v1/listing')
        .set({ authorization: 'oops' })
        .send(body)
        .expect(403));

    it('should return 403 without token', () =>
      request(app.getHttpServer())
        .post('/api/v1/listing')
        .send(body)
        .expect(403));
  });

  describe('PUT /api/v1/listing', () => {
    const body = {
      id: '82873DD0-59E5-4767-A75F-8FA1FE8E9E48',
      name: 'Vauxhall Astra',
      description: 'Skuff on drivers door',
      agreedToTermsAndConditions: true,
      travelOptionId: 'travel-only',
      createdBy: 'Garry',
    };

    it('should return 200 with id of the new listing', () =>
      request(app.getHttpServer())
        .put('/api/v1/listing')
        .set({
          authorization: 'valid-token',
        })
        .send(body)
        .expect((res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.id).toMatch(/.+/);
        }));

    it('should return 403 without valid token', () =>
      request(app.getHttpServer())
        .put('/api/v1/listing')
        .set({ authorization: 'oops' })
        .send(body)
        .expect(403));

    it('should return 403 without token', () =>
      request(app.getHttpServer())
        .put('/api/v1/listing')
        .send(body)
        .expect(403));

    it(`should return 403 when updating some else's listing`, () =>
      request(app.getHttpServer())
        .put('/api/v1/listing')
        .set({ authorization: 'valid-token-bob' })
        .send(body)
        .expect(403));
  });
});
