import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DoctorEntity } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Speciality } from './enum/speciality.enum';
import { QualificationCategory } from './enum/category.enum';
import { DoctorType } from './enum/type.enum';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Gender } from '../user/enum/gender.enum';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    private readonly userService: UserService
  ) {}

  async create(doctor: CreateDoctorDto): Promise<DoctorEntity> {
    try {
      const _user = await this.userService.findOne(+doctor.userId);
      if (_user){
        const doctorEmtity = new DoctorEntity();
        doctorEmtity.speciality = doctor.speciality;
        doctorEmtity.category = doctor.category || QualificationCategory.Second;
        doctorEmtity.type = doctor.type || DoctorType.Adult;
        doctorEmtity.startWorking = doctor.startWorking;
        doctorEmtity.price = doctor.price || '0';
        doctorEmtity.info = doctor.info;
        doctorEmtity.photo = doctor.photo;
        doctorEmtity.user = _user
        return await this.doctorRepository.save(doctorEmtity);
      } else {
        throw new Error(`user with this Id = ${doctor.userId} doesn't exist`)
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async findAll(): Promise<DoctorEntity[]> {
    return this.doctorRepository.find({});
  }

  async findById(id: number): Promise<DoctorEntity> {
    return this.doctorRepository.findOne({
      relations: ['user'],
      where: { id }
    });
  }

  /**
   *
   * @param speciality
   * @returns докторов по выбранной специальности
   */
  async findBySpeciality(speciality: Speciality): Promise<DoctorEntity[]>{
    return await this.doctorRepository.find({
      relations: ['user'],
      where: {
        speciality: speciality,
      }
    })
  }

  /**
   *
   * @param gender - мужской или женский пол
   * @returns докторов заданного пола
   */
  async findByGender(gender: Gender): Promise <DoctorEntity[]> {
    return await this.doctorRepository.find({
      relations:['user'],
      where: {
        user: {
          gender: gender
        }
      }
    })
  }

  /**
   *
   * @param gender мужской или женский пол
   * @param speciality
   * @returns докторов заданного пола
   */
  async findByGenderAndSpeciality(gender: Gender, speciality: Speciality): Promise <DoctorEntity[]> {
    return await this.doctorRepository.find({
      relations:['user'],
      where: {
        user: {
          gender: gender
        },
        speciality: speciality
      }
    })
  }

  /**
   *
   * @returns список всех специальностей, которые есть в клинике
   */
  async findAllSpecialities():Promise<string[]> {
    const uniqueSpecialities = await this.doctorRepository
      .createQueryBuilder('doctors')
      .select('DISTINCT doctors.speciality', 'speciality')
      .getRawMany();
    return uniqueSpecialities.map(item => item.speciality);
  }

  /**
   *
   * @param id
   * @param updateDoctorDto
   * @returns updated DoctorEntity
   */
  async update(id: number, updateDoctorDto: UpdateDoctorDto):Promise<DoctorEntity> {
   try {
     const _doctor = await this.findById(id);
     if( _doctor) {
      const doctorEntity = new DoctorEntity();
      doctorEntity.id = _doctor.id
      doctorEntity.speciality = updateDoctorDto.speciality || _doctor.speciality;
      doctorEntity.category = updateDoctorDto.category || _doctor.category;
      doctorEntity.type = updateDoctorDto.type || _doctor.type;
      doctorEntity.startWorking = updateDoctorDto.startWorking || _doctor.startWorking;
      doctorEntity.price = updateDoctorDto.price || _doctor.price;
      doctorEntity.info = updateDoctorDto.info || _doctor.info;
      doctorEntity.photo = updateDoctorDto.photo || _doctor.photo;
      return await this.doctorRepository.save(doctorEntity);

     } else {
         throw new BadRequestException('Doctor with this id doesn`t exist')
     }
   } catch (error) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: error,
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
   }
  }


  async delete(id: number) : Promise<boolean> {
    try {
      const _doctor = await this.findById(id)
      if(_doctor){
         await this.doctorRepository.delete({id})
         return true
      } else {
          throw new HttpException(
            {
                status: HttpStatus.FORBIDDEN,
                error: 'This doctor does not exist.',
            }, HttpStatus.FORBIDDEN
          )
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
