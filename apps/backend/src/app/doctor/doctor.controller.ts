import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';
import { DoctorEntity } from './entities/doctor.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  /**
   * Creates a doctor
   * @param createDoctorDto
   * @returns
   */
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DoctorEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('/create')
  @UsePipes(new ValidationPipe())
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  /**
   *
   * @param req
   * @returns All doctors
   */
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [UserEntity],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('/all')
  getAll() {
    return this.doctorService.findAll();
  }
}
