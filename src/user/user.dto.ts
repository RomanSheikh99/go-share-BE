import { IsEmail } from "class-validator";

export class CreateUserDTO {
  readonly name: string;
  readonly password: string;

  @IsEmail()
  readonly email: string;
}