import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDTO, SignUpDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;


@Injectable()
export class AuthService {

  constructor(private usersService: UserService,
    private jwtService: JwtService) { }


  async signUp(signUpData: SignUpDTO): Promise<any> {
    try {
      const user = await this.usersService.findOne(signUpData.email);
      if (user) {
        throw new UnauthorizedException("user all ready exists");
      }
      signUpData.password = await bcrypt.hash(signUpData.password, saltOrRounds);
      const res = await this.usersService.create(signUpData);
      const { name, id } = res;
      const payload = { sub: id, username: name };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      return error;
    }
  }

  async signIn(signInDto: SignInDTO): Promise<any> {
    try {
      const user = await this.usersService.findOne(signInDto.email);
      if (!user) {
        throw new UnauthorizedException("user not find");
      }
      const passwordsMatch = await bcrypt.compare(signInDto.password, user.password);
      if (!passwordsMatch) {
        throw new UnauthorizedException('Invalid password');
      }
      const { name, id } = user;
      const payload = { sub: id, username: name };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      return error;
    }
  }

  async getProfile(sub: string): Promise<any> {
    try {
      const user = await this.usersService.findOneById(sub);
      const {id,name,email} = user;
      return {id,name,email};
    } catch (error) {
      return error;
    }
  }

}
