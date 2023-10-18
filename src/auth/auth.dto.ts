import { IsEmail } from "class-validator";

export class SingInDTO {
    
    @IsEmail()
    readonly email: string;
    readonly password: string;
}

export class SingUpDTO {
    name: string;

    @IsEmail()
    email: string;
    password: string;
}