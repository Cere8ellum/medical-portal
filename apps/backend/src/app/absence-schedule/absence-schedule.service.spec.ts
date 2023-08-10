import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceScheduleService } from './absence-schedule.service';

describe('AbsenceScheduleService', () => {
  let service: AbsenceScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenceScheduleService],
    }).compile();

    service = module.get<AbsenceScheduleService>(AbsenceScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
