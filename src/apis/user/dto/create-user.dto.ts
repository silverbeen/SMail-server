import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userId: string;

  @IsString()
  userName: string;

  @IsString()
  userPassword: string;
}

export class AuthUserDto {
  @IsString()
  userId: string;

  @IsString()
  userPassword: string;
}
