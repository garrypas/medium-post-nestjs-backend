import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '@health/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('ping', () => {
    it('should return status="OK"', () => {
      expect(healthController.getPing()).toEqual({ status: 'OK' });
    });
  });
});
