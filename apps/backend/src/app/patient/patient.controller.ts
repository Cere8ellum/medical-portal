import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { PatientEntity } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@ApiTags('patients')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  /**
   * Creates a patient
   * @param createPatientDto
   * @returns
   */
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PatientEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/create')
  @UsePipes(new ValidationPipe())
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }
}
