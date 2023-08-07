import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
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
    return await this.userRepository.findOneBy({id});
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const tlc = email.toLowerCase();
    return this.userRepository.findOne({ where: { email: tlc } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
