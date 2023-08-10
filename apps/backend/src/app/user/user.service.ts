import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import * as argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailServise: MailService
  ) {}

  // create user
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) throw new BadRequestException('This email already exist');

    const user = await this.userRepository.save({
      uuid: uuid(),
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      status: UserRole.disabled,
      created: new Date(),
    });

    await this.mailServise.sendUserConfirmation(user, user.uuid);

    return { user };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return { users };
    // return `This action returns all user`;
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  // confirm user registration
  async findUuid(uuid: string) {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!user) throw new BadRequestException("'This confirm doesn't exist'");

    if (user.status !== 'disabled')
      throw new BadRequestException('Error confirm users');

    user.status = UserRole.enabled;
    await this.userRepository.save(user);
    return {
      message: 'success change status to patient',
    };
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
