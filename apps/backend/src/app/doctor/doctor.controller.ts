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
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { diskStorage } from 'multer'
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Speciality } from './enum/speciality.enum';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { Role } from '../user/enum/role.enum';

const helperFileLoader = new HelperFileLoader();
const PATH_NEWS = '/doctor_photos';
helperFileLoader.path = PATH_NEWS;

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly userService: UserService) {}

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
  @ApiBody({type: CreateDoctorDto})
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile() photo: Express.Multer.File,
    @Res() res: Response){
      try {
        if (photo?.filename) {
          createDoctorDto.photo = PATH_NEWS + '/' + photo.filename;
        }
        const _doctor = await this.doctorService.create(createDoctorDto);
        _doctor.user.password = '';
        res.status(HttpStatus.OK).json(_doctor);
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
  @ApiQuery({
    name: 'speciality',
    type: String,
    description: 'специализация врача'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [DoctorEntity],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request', type: Error })
  async getDoctorsWithSpeciality(
   @Query('speciality') speciality : string): Promise<DoctorEntity[]> {
      try {
        let _doctors:DoctorEntity[] = [];
        if(!Speciality[speciality]) {
          for (const [key, value] of Object.entries(Speciality)) {
            if(value === speciality){
              _doctors =  await this.doctorService.findBySpeciality(Speciality[key])
            }
          }
        } else {
          _doctors =  await this.doctorService.findBySpeciality(Speciality[speciality])
        }
        _doctors.map((doc: DoctorEntity)=> { doc.user.password = ''});

        return _doctors
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
      _doctors.map(doctor => {
        doctor.user.password = '';
      });
      res.status(HttpStatus.OK).json( _doctors);
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
      type: DoctorEntity,
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiOperation({ summary: 'Doctor info' })
    @ApiParam({
      name: 'id',
      type: String,
      description: 'id doctor'
    })
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
       _doctor.user.password=''
        res.status(HttpStatus.OK).json(_doctor);
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
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('/all/specialities')
  async getAllSpecialities(): Promise<string[]>{
    try {
      return await this.doctorService.findAllSpecialities();
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }

  }


@ApiOperation({ summary: 'Возвращает доктора по user Id.Если user.role = doctor' })
@ApiParam({
  name:'userId',
  description: 'id user',
  type: Number
})
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Success',
  type: DoctorEntity
})
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: 'The user doesn`t exist.',
  type: String
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Access denied. Insufficient role.',
  type: String
})
  @Get('find/:userId')
  async findDoctorByUserId(
  @Param('userId',ParseIntPipe) userId: number,
  @Res() res: Response
  ) {
    try {
      const _user = await this.userService.findOne(userId);
      if(!_user){
        res.status(HttpStatus.NOT_FOUND).send(`The user with id=${userId} doesn't exist.`)
      }
      if(_user.role !== Role.Doctor) {
        res.status(HttpStatus.FORBIDDEN).send('Access denied. Insufficient role.');
      }
      res.status(HttpStatus.OK).json(await this.doctorService.findByUserId(userId));
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
  @ApiParam({
    name: 'id',
    type: String,
    description: 'doctor id'
  })
  @ApiBody({
    type: UpdateDoctorDto,
    description: 'поля с измененными данными '
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: DoctorEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
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
          console.log('photo',photo.filename)
          updateDoctorDto.photo = PATH_NEWS + '/' + photo.filename;
        }
        const _doctor = await this.doctorService.update(id,updateDoctorDto);
        _doctor.user.password = '';
        return _doctor
      } catch (error) {
        throw Error(`err: ${error}`);
      }
  }

/**
 *
 * @param id
 * @returns message about operation delete
 */
 @ApiResponse({
  status: HttpStatus.OK,
  description: 'Запись успешно удалена',
  type: String,
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Произошла ошибка, удаление не возможно',
type: String })
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: 'Доктор не найден',
type: String })
@ApiParam({
  name:'id',
  type: String,
  description: 'doctor id'
})
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление doctor' })
  async delete(
    @Param('id', ParseIntPipe) id : number,
    @Res() res: Response) {
    const _doc= await this.doctorService.findById(id)
    if(!_doc) {
      res.status(HttpStatus.NOT_FOUND).send('Доктор не найден');
    }
    const _del = await this.doctorService.delete(id);
    if(_del === true){
     res.status(HttpStatus.OK).send('Доктор успешно удален');
    } else {res.status(HttpStatus.FORBIDDEN).send(`Произошла ошибка, удаление не возможно`); }
  }
}
