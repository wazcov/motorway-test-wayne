import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {mockStateLogReturnedValue} from "../src/test/mocks";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Success!');
  });

  it('/search (GET)', () => {
    return request(app.getHttpServer())
        .get('/stateLog/search?vehicleId=3&timestamp=2022-09-12T10:00:00')
        .expect(200)
        .expect(mockStateLogReturnedValue);
  });
});
