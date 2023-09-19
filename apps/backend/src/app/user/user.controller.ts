import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  BadRequestException,
  Res,
  Req,
  ParseIntPipe,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Get('/:id')
  async getByID(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // регистрация пользователя
  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    newUser.password = '';
    return newUser;
  }

  // логин пользователя
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!(await argon2.verify(user.password, password))) {
      throw new BadRequestException('Incorrect password');
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '7d' }
    );
    const refreshToken = await this.jwtService.signAsync({ id: user.id });

    response.status(200);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    return {
      token: refreshToken,
    };
  }

  // проверка авторизации
  @Get()
  async user(@Req() request: Request) {
    try {
      const refreshToken = request.cookies['refresh_token'];
      const { id } = await this.jwtService.verifyAsync(refreshToken);
      // const accessToken = request.headers.authorization.replace('Bearer ', '')
      // const {id} = await this.jwtService.verifyAsync(accessToken)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...data } = await this.userService.findOne(id);
      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const refreshToken = request.cookies['refresh_token'];
      console.log('refreshToken', refreshToken);
      const { id } = await this.jwtService.verifyAsync(refreshToken);
      const token = await this.jwtService.signAsync(
        { id },
        { expiresIn: '7d' }
      );
      response.status(200);
      return { token };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      response.status(200);
      response.clearCookie('refresh_token');
      return {
        message: 'logout successful',
      };
    } catch (err) {
      console.log(err);
    }
  }

  @Get('admin/search')
  @ApiOperation({ summary: 'Поиск пациента по фио и рождении' })
  @ApiQuery({
    name: 'firstname',
    description: 'firstname',
    type: String,
  })
  @ApiQuery({
    name: 'lastname',
    description: 'lastname',
    type: String,
  })
  @ApiQuery({
    name: 'bday',
    description: 'bday',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Пациента', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findPatient(
    @Query('firstname') firstname: string,
    @Query('lastname') lastname: string,
    @Query('bday') bday: string,
    @Res() res: Response
  ) {
    try {
      const _patient = await this.userService.findPatientByNameAndBday(
        firstname,
        lastname,
        bday
      );
      if (!_patient) {
        res.status(HttpStatus.NOT_FOUND).send('Пациент не найден');
      }
      _patient.password = '';
      res.status(HttpStatus.OK).json(_patient);
    } catch (error) {
      throw new BadRequestException(`Message: ${error}`);
    }
  }

  @Get('/confirm/:uuid')
  findUuid(@Param('uuid') uuid: string) {
    return this.userService.findUuid(uuid);
  }

  // get all users by admin
  @Get('/admin/users')
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
