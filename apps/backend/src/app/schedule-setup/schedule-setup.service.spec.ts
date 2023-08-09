import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleSetupService } from './schedule-setup.service';

describe('ScheduleSetupService', () => {
  let service: ScheduleSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleSetupService],
    }).compile();

    service = module.get<ScheduleSetupService>(ScheduleSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
