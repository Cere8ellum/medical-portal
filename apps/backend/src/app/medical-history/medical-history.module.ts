import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryEntity } from './entities/medical-history.entity';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistoryEntity]),
  //forwardRef(() => MedicalHistoryModule)
],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
  exports: [
    TypeOrmModule.forFeature([MedicalHistoryEntity]),
    MedicalHistoryService
  ]
})
export class MedicalHistoryModule {}
