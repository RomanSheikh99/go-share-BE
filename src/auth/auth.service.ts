import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SingInDTO, SingUpDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
// const password = 'random_password';


@Injectable()
export class AuthService {

  constructor(private usersService: UserService,
    private jwtService: JwtService) { }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user?.email !== email) {
      throw new UnauthorizedException();
    }
    console.log(user);
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async singUp(singUpData: SingUpDTO): Promise<any> {
    try {
      const user = await this.usersService.findOne(singUpData.email);
      if (user) {
        throw new UnauthorizedException("user all ready exists");
      }
      singUpData.password = await bcrypt.hash(singUpData.password, saltOrRounds);
      const res = await this.usersService.create(singUpData);
      const { name, email, id } = res;
      const payload = { sub: id, username: name };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      return error;
    }
  }

  async singIn(signInDto: SingInDTO): Promise<any> {
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
