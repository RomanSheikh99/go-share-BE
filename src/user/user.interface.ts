import { IsString, IsEmail } from 'class-validator';

export class User {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
