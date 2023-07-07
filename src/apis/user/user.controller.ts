import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '../../entities/User';
import { AuthUserDto, CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response<any, Record<string, any>>> {
    return this.userService.create(createUserDto);
  }

  // sign-in
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() authUserDto: AuthUserDto): Promise<any> {
    return this.userService.login(authUserDto);
  }

  // user find one
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
