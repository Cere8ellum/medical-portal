import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import * as argon2 from 'argon2';
import { Role } from './enum/role.enum';
import { DoctorService } from '../doctor/doctor.service';
import { v4 as uuid } from 'uuid';
import { MailService } from '../mail/mail.service';
import { Gender } from './enum/gender.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => DoctorService))
    private doctorServise: DoctorService,
    private mailServise: MailService
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) throw new BadRequestException('This email already exist');

  try {
    const user = await this.userRepository.save({
      uuid: uuid(),
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      status: UserRole.disabled,
      role: createUserDto.role || Role.Patient,
      gender: createUserDto.gender || Gender.Male,
      mobile: createUserDto.mobile || '',
      birthdate: createUserDto.birthdate || new Date().toString(),
      address: createUserDto.address || '',
      firstname: createUserDto.firstname || '',
      lastname: createUserDto.lastname || '',
      created: new Date(),
    });

    await this.mailServise.sendUserConfirmation(user, user.uuid);

    return user ;
  } catch (error) {
    if (existUser) throw new BadRequestException('This email already exist');
  }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return { users };
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // confirm user registration
  async findUuid(uuid: string) {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid,
      },
    });
    console.log('user ', user);
    if (!user) throw new BadRequestException("'This confirm doesn't exist'");

    if (user.status !== 'disabled')
      throw new BadRequestException('Error confirm users');

    user.status = UserRole.enabled;
    await this.userRepository.save(user);
    return {
      message: 'success change status to enabled',
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const tlc = email.toLowerCase();
    return this.userRepository.findOne({ where: { email: tlc } });
  }

  async findPatientByNameAndBday (firstname:string, lastname:string,bday: string):Promise<UserEntity> {
    try {
      const _user = await this.userRepository.findOne({
        where: {
          firstname: Like(`%${firstname}%`),
          lastname: Like(`%${lastname}%`),
          birthdate: bday,
          role: Role.Patient
        }
      });
      return _user
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const existUser = await this.findOne(id);
    if (!existUser) throw new BadRequestException('This user doesn`t exist');

    const existUserWithEmail = updateUserDto.email
      ? await this.findByEmail(updateUserDto.email)
      : null;

    if (existUserWithEmail && updateUserDto.email !== existUser.email) {
      throw new BadRequestException('This email already exist');
    }

    const user = await this.userRepository.save({
      id: id,
      firstname: updateUserDto.firstname || existUser.firstname,
      lastname: updateUserDto.lastname || existUser.lastname,
      gender: updateUserDto.gender || existUser.gender,
      birthdate: updateUserDto.birthdate,
      email: updateUserDto.email || existUser.email,
      address: updateUserDto.address || existUser.address,
      role: updateUserDto.role || existUser.role,
      mobile: updateUserDto.mobile || existUser.mobile,
      password: updateUserDto.password
        ? await argon2.hash(updateUserDto.password)
        : existUser.password,
    });
    return user;
  }

  async remove(id: number) {
    try {
      const _user = await this.findOne(id);
      if (!_user) {
        throw new BadRequestException('User with this id doesn`t exist');
      }
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
