import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';
import { Role } from './enum/role.enum';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => DoctorService))
    private doctorServise: DoctorService
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createDto', this.userRepository);
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) throw new BadRequestException('This email already exist');

    const user = await this.userRepository.save({
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      gender: createUserDto.gender,
      birthdate: createUserDto.birthdate,
      email: createUserDto.email,
      address: createUserDto.address,
      mobile: createUserDto.mobile,
      password: await argon2.hash(createUserDto.password),
    });
    return { user };
  }

  async findAll() {
    console.log('findAll', this.userRepository);
    const users = await this.userRepository.find();
    console.log('users111', users);
    return { users };
    // return `This action returns all user`;
  }

  async findOne(id: number): Promise <UserEntity> {
    try {
      return await this.userRepository.findOneBy({id});
    } catch (error) {
      console.log(error)
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const tlc = email.toLowerCase();
    return this.userRepository.findOne({ where: { email: tlc } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {

    const existUser = await this.findOne(id);
    if (!existUser) throw new BadRequestException('This user doesn`t exist');

    const existUserWithEmail = updateUserDto.email? await this.findByEmail(updateUserDto.email) : null;

    if(existUserWithEmail && updateUserDto.email !== existUser.email) {
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
      password: updateUserDto.password ? await argon2.hash(updateUserDto.password) : existUser.password,
    });
    return user ;
  }

  async remove(id: number) {
    try {
      const _user = await this.findOne(id);
      if(!_user) {
        throw new BadRequestException('User with this id doesn`t exist');
      }
      if(_user && _user.role === Role.Doctor) {
          const _doctor = await this.doctorServise.findByUserId(id);
          await this.doctorServise.delete(_doctor.id);
      }
      await this.userRepository.delete(id);
      return true

    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
