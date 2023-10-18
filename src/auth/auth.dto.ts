import { IsEmail } from "class-validator";

export class SingInDTO {
    readonly name: string;
    readonly age: number;
    readonly breed: boolean;

    // @IsEmail()
    readonly email: boolean;
}

export class SingUpDTO {
    name: string;

    @IsEmail()
    email: string;
    password: string;
}