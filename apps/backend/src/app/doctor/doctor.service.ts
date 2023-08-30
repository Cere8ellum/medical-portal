import { BadGatewayException, BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { DoctorEntity } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserService } from '../user/user.service';
import { Speciality } from './enum/speciality.enum';
import { QualificationCategory } from './enum/category.enum';
import { DoctorType } from './enum/type.enum';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Gender } from '../user/enum/gender.enum';
import { Role } from '../user/enum/role.enum';


@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  /**
   *
   * @param doctor
   * @returns DoctorEntity
   */
  async create(doctor: CreateDoctorDto): Promise<DoctorEntity> {
    try {
      const _user = await this.userService.findOne(+doctor.userId);

      if (!_user){
        throw new Error(`User with Id = ${doctor.userId} doesn't exist`);
      }
        const userUpdate = await this.userService.update(+doctor.userId,{
          lastname: doctor.lastname,
          firstname: doctor.firstname,
          email: doctor.email,
          gender: Gender[doctor.gender],
          address: doctor.address,
          mobile: doctor.mobile,
          birthdate: doctor.birthdate,
          role: Role.Doctor,
          password: doctor.password
        })

        const doctorEntity = new DoctorEntity();
        doctorEntity.speciality = doctor.speciality;
        doctorEntity.category = doctor.category || QualificationCategory.Second;
        doctorEntity.type = doctor.type || DoctorType.Adult;
        doctorEntity.startWorking = doctor.startWorking;
        doctorEntity.price = doctor.price || '0';
        doctorEntity.info = doctor.info;
        doctorEntity.photo = doctor.photo;
        doctorEntity.user = userUpdate;
        const _doctor = await this.doctorRepository.save(doctorEntity);
      return _doctor
    } catch (error) {
      throw new BadRequestException(`Can't create doctor: ${error}`);
    }
  }

  /**
   *
   * @returns DoctorEntity[]
   */
  async findAll(): Promise<DoctorEntity[]> {
    try {
      return await this.doctorRepository.find({relations:['user']});
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   *
   * @param id
   * @returns doctor by id
   */
  async findById(id: number): Promise<DoctorEntity> {
    try {
      return await this.doctorRepository.findOne({
        relations: ['user'],
        where: { id: id }
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * поиск врача по его user_id
   * @param user_id
   * @returns doctor with user.id = user_id
   */
  async findByUserId(user_id: number): Promise<DoctorEntity> {
    try {
      return await this.doctorRepository.findOne({
        relations: ['user'],
        where: {user: {
          id: user_id
        }}
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
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

  async findByGenderSpecialityType(gender: Gender, speciality: Speciality,type: DoctorType): Promise <DoctorEntity[]>{
    return await this.doctorRepository.find({
      relations:['user'],
      where: {
        user: {
          gender: gender,
        },
        speciality: speciality,
        type: type
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
     const _user = await this.userService.findOne(_doctor.user.id);
     if( _doctor && _user) {
       const updateUser = await this.userService.update(_user.id,{
        lastname: updateDoctorDto.lastname,
        firstname: updateDoctorDto.firstname,
        email: updateDoctorDto.email,
        password: updateDoctorDto.password,
        gender: Gender[updateDoctorDto.gender],
        address: updateDoctorDto.address,
        birthdate: updateDoctorDto.birthdate,
        role: Role.Doctor,
        mobile: updateDoctorDto.mobile
       })
      const doctorEntity = new DoctorEntity();
      doctorEntity.id = id
      doctorEntity.speciality = updateDoctorDto.speciality || _doctor.speciality;
      doctorEntity.category = updateDoctorDto.category || _doctor.category;
      doctorEntity.type = updateDoctorDto.type || _doctor.type;
      doctorEntity.startWorking = updateDoctorDto.startWorking || _doctor.startWorking;
      doctorEntity.price = updateDoctorDto.price || _doctor.price;
      doctorEntity.photo = updateDoctorDto.photo || _doctor.photo;
      doctorEntity.info = updateDoctorDto.info || _doctor.info;
      doctorEntity.user = updateUser;

      return await this.doctorRepository.save(doctorEntity);
     } else {
         throw new BadRequestException('Doctor or User with this id doesn`t exist')
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
      const _user = await this.userService.findOne(_doctor.user.id)

      if(_doctor && _user){
        await this.doctorRepository.delete(id)
       // await this.userService.remove(_user.id)
        return true
      } else {
          throw new HttpException(
            {
                status: HttpStatus.FORBIDDEN,
                error: 'This doctor or user does not exist.',
            }, HttpStatus.FORBIDDEN
          )
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
