import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleSetupController } from './schedule-setup.controller';

describe('ScheduleSetupController', () => {
  let controller: ScheduleSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleSetupController],
    }).compile();

    controller = module.get<ScheduleSetupController>(ScheduleSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
