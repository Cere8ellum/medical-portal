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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Get('/:id')
  async getByID(@Param('id', ParseIntPipe) id: number){
    return this.userService.findOne(id)
  }

  // регистрация пользователя
  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
      { expiresIn: '30s' }
    );
    const refreshToken = await this.jwtService.signAsync({ id: user.id });

    response.status(200);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    return {
      token: accessToken,
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
      const { id } = await this.jwtService.verifyAsync(refreshToken);
      const token = await this.jwtService.signAsync(
        { id },
        { expiresIn: '30s' }
      );
      response.status(200);
      return { token };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');
    response.status(200);
    return {
      message: 'logout successfull',
    };
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':uuid')
  findUuid(@Param('uuid') uuid: string) {
    return this.userService.findUuid(uuid);
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
