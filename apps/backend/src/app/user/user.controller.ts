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
import { ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}


  @Get('/:id')
  @ApiOperation({ summary: 'Получить данные о пользователе' })
  @ApiParam({
    name: 'id',
    description: 'user id',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'данные о пользователе',
    type: UserEntity
  })
  async getByID(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // регистрация пользователя
  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    newUser.password = '';
    return newUser
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
      role: user.role,
    };
  }

  // проверка авторизации
  @Get()
  async user(@Req() request: Request) {
    try {
      const refreshToken = request.cookies['refresh_token'];
      const { id } = await this.jwtService.verifyAsync(refreshToken);
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
    name:'firstname',
    description: 'firstname',
    type:String
  })
  @ApiQuery({
    name:'lastname',
    description: 'lastname',
    type:String
  })
  @ApiQuery({
    name:'bday',
    description: 'bday',
    type:String
  })
  @ApiResponse({ status: 200, description: 'Пациента',type: UserEntity})
  @ApiResponse({ status: 404, description: 'Not found'})
  async findPatient(
    @Query('firstname') firstname : string,
    @Query('lastname') lastname: string,
    @Query('bday') bday: string,
    @Res() res: Response
  ) {
    try {
      let _patient = await this.userService.findPatientByNameAndBday(firstname,lastname,bday);
      if(!_patient) {
        res.status(HttpStatus.NOT_FOUND).send('Пациент не найден');
      }
      _patient.password = '';
      res.status(HttpStatus.OK).json(_patient);
    } catch (error) {
      throw new BadRequestException(`Message: ${error}`)
    }
  }

  @Get('/confirm/:uuid')
  findUuid(@Param('uuid') uuid: string) {
    return this.userService.findUuid(uuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  //@Api
  @Patch('change/password')
  @ApiOperation({
    summary: 'Смена пароля'
  })
  @ApiQuery({
    name: 'oldpass',
    description: 'старый пароль',
    type: String
  })
  @ApiQuery({
    name: ' email',
    description: 'email пользлвателя',
    type: String
  })
  @ApiQuery({
    name:'newpass',
    type: String,
    description: 'новый пароль'
  })
  @ApiResponse({
    status: 200,
    description: 'Пароль успешно изменен',
    type: String
  })
  @ApiResponse({
    status: 400,
    description: 'Указанный старый пароль неверен',
    type: String
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь с таким email не обнаружен',
    type: String
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь с таким email не обнаружен',
    type: String
  })

  async changePassword(
    @Query('oldpass')oldpass: string,
    @Query('email') email: string,
    @Query('newpass') newpass: string,
    @Res()res:Response
  ){
    try {
      console.log('query',oldpass,email,newpass)
      const _user = await this.userService.findByEmail(email);
      if(!_user) {
        res.status(HttpStatus.NOT_FOUND).send('Пользователь с таким email не обнаружен')
      }

      if(! await argon2.verify(_user.password, oldpass)){
        res.status(HttpStatus.BAD_REQUEST).send('Указанный старый пароль неверен')
      }

      const updateUserDto = new UpdateUserDto;
      updateUserDto.password = newpass;

      const _updateUser = await this.userService.update(_user.id,updateUserDto);
      res.status(HttpStatus.OK).send('Пароль успешно изменен');
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
