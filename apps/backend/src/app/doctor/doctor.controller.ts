import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  Query,
  ParseEnumPipe,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';
import { DoctorEntity } from './entities/doctor.entity';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { diskStorage } from 'multer'
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Speciality } from './enum/speciality.enum';
import { Response } from 'express';

const helperFileLoader = new HelperFileLoader();
const PATH_NEWS = '/doctor_photos';
helperFileLoader.path = PATH_NEWS;

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  /**
   * Creates a doctor
   * @param createDoctorDto
   * @returns
   */
  @Post('/create')
  @ApiOperation({ summary: 'Create a doctor' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DoctorEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo',
    {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
      fileFilter: helperFileLoader.fileFilter
    }),
  )
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile() photo: Express.Multer.File): Promise<DoctorEntity> {
      try {
        if (photo?.filename) {
          createDoctorDto.photo = PATH_NEWS + '/' + photo.filename;
        }
        return await this.doctorService.create(createDoctorDto);
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
  }

  /**
   *
   * @param speciality
   * @returns all doctors by spesiality
   */
  @Get('/speciality')
  @ApiOperation({ summary: 'all doctors by spesiality' })
  async getDoctorsWithSpeciality(
   @Query('speciality') speciality : string): Promise<DoctorEntity[]> {
      try {
        if(!Speciality[speciality]) {
          for (const [key, value] of Object.entries(Speciality)) {
            if(value === speciality){
              return await this.doctorService.findBySpeciality(Speciality[key])
            }
          }
        } else {
            return await this.doctorService.findBySpeciality(Speciality[speciality])
        }
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
  }


  /**
   *
   * @param req
   * @returns All doctors
   */
  @ApiOperation({ summary: 'All doctors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DoctorEntity],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('/all')
  async getAll(
    @Res() res: Response
  ) {
    try {
      const _doctors = await this.doctorService.findAll();
      const result = [];
      _doctors.forEach(doctor => {
        doctor.user.password = '';
        result.push(doctor)
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }



  /**
   *
   * @param id doctor_id
   * @returns return DoctorEntity
   */
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: [DoctorEntity],
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: 'Doctor info' })
    @Get('/:id')
    async getOneById(
      @Param('id',ParseIntPipe)id : number,
      @Res() res: Response
    ) {
      try {
        const _doctor = await this.doctorService.findById(id);
        if(!_doctor) {
            res.status(HttpStatus.BAD_REQUEST).send('The doctor doesn`t exist');
        }
        const {user, ...doctor} = _doctor;
        const {password, ...userData} = user;
        res.status(HttpStatus.OK).json({doctor,userData});
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
  }

  /**
   *
   * @returns all speciality
   */
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [String],
  })
  @ApiOperation({ summary: 'All speciality' })
  @Get('/all/specialities')
  async getAllSpecialities(): Promise<string[]>{
    try {
      return await this.doctorService.findAllSpecialities();
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }

  }

  /**
   *
   * @param id
   * @param updateDoctorDto
   * @param photo
   * @returns
   */
  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a doctor' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo',
    {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
      fileFilter: helperFileLoader.fileFilter
    }),
  )
  async update(
    @Param('id',ParseIntPipe ) id : number,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @UploadedFile() photo: Express.Multer.File
    ): Promise<DoctorEntity> {
      try {
        if (photo?.filename) {
          updateDoctorDto.photo = PATH_NEWS + '/' + photo.filename;
        }
        return await this.doctorService.update(id,updateDoctorDto);
      } catch (error) {
        throw Error(`err: ${error}`);
      }
  }

/**
 *
 * @param id
 * @returns message about operation delete
 */
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление doctor' })
  async delete(@Param('id', ParseIntPipe) id : number) {
    const _del = await this.doctorService.delete(id);
    if(_del === true){
      return 'Запись успешно удалена'
    } else { return `Произошла ошибка,запись удалить не удалось` }
  }
}
