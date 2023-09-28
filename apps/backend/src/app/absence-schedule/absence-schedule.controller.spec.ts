import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceScheduleController } from './absence-schedule.controller';

describe('AbsenceScheduleController', () => {
  let controller: AbsenceScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenceScheduleController],
    }).compile();

    controller = module.get<AbsenceScheduleController>(
      AbsenceScheduleController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
