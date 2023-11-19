import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { DriverService } from 'src/driver/driver.service';
export declare class AuthService {
    private usersService;
    private driverService;
    private jwtService;
    constructor(usersService: UserService, driverService: DriverService, jwtService: JwtService);
    signUp(signUpData: SignUpDTO): Promise<any>;
    userSignUp(signUpData: SignUpDTO): Promise<any>;
    driverSignUp(signUpData: SignUpDTO): Promise<any>;
    signIn(signInDto: SignInDTO): Promise<any>;
    getProfile(sub: string): Promise<any>;
}
