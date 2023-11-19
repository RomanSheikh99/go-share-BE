import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDTO, res: Response): Promise<any>;
    signIn(signInDto: SignInDTO, res: Response): Promise<any>;
    getProfile(req: Request): Promise<any>;
    getDriver(id: string): Promise<any>;
}
