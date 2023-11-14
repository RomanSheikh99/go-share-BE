import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDTO, SignUpDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { DriverService } from 'src/driver/driver.service';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private driverService: DriverService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpDTO): Promise<any> {
    if (signUpData.type == 2) {
      return await this.driverSignUp(signUpData);
    } else {
      return await this.userSignUp(signUpData);
    }
  }

  async userSignUp(signUpData: SignUpDTO): Promise<any> {
    try {
      const user = await this.usersService.findOne(signUpData.email);
      if (user) {
        throw new UnauthorizedException('user all ready exists');
      }
      signUpData.password = await bcrypt.hash(
        signUpData.password,
        saltOrRounds,
      );
      const res = await this.usersService.create(signUpData);
      const { name, id } = res;
      const payload = { sub: id, username: name };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async driverSignUp(signUpData: SignUpDTO): Promise<any> {
    try {
      const user = await this.driverService.findOne(signUpData.email);
      if (user) {
        throw new UnauthorizedException('user all ready exists');
      }
      signUpData.password = await bcrypt.hash(
        signUpData.password,
        saltOrRounds,
      );
      const res = await this.driverService.create(signUpData);
      const { name, id } = res;
      const payload = { sub: id, username: name };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      console.error('Error during userSignUp:', error.message);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async signIn(signInDto: SignInDTO): Promise<any> {
    try {
      const user = await this.usersService.findOne(signInDto.email);
      const driver = await this.driverService.findOne(signInDto.email);
      if (!user && !driver) {
        throw new NotFoundException('user not find');
      }
      const password = user ? user.password : driver.password;
      const passwordsMatch = await bcrypt.compare(signInDto.password, password);
      if (!passwordsMatch) {
        throw new UnauthorizedException('Invalid password');
      }
      const { name, id } = user ? user : driver;
      const payload = { sub: id, username: name };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      console.error('Error during user sign in:', error.message);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getProfile(sub: string): Promise<any> {
    console.error('sub', sub);
    try {
      let user = await this.usersService.findOneById(sub);
      let driver = await this.driverService.findOneById(sub);
      if (!user && !driver) {
        throw new NotFoundException('user not find');
      }
      const type = user ? 1 : 2;
      const { id, name, email } = user ? user : driver;
      return { id, name, email, type };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
