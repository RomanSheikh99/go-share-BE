import { IsEmail } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  readonly email: string;
  readonly password: string;
}

export class SignUpDTO {
  readonly name: string;

  @IsEmail()
  readonly email: string;
  password: string;
  type: number;
}
