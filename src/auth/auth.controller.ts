import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SingInDTO, SingUpDTO } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @HttpCode(HttpStatus.OK)
  @Post('singup')
  async signUp(@Body() signUpDto: SingUpDTO, @Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.authService.singUp(signUpDto);
      if (response.token) {
        res.cookie('token', response.token, {
          httpOnly: true,
          domain: 'localhost:4200',
          secure: true,
          sameSite: 'none'
        });
      }
      return response;
    } catch (error) {
      return error
    }
  }


  @HttpCode(HttpStatus.OK)
  @Post('singin')
  async signIn(@Body() signInDto: SingInDTO, @Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.authService.singIn(signInDto);
      if (response.token) {
        res.cookie('token', response.token, {
          httpOnly: true,
          domain: 'localhost:4200',
          secure: true,
          sameSite: 'none'
        });
      }
      return response;
    } catch (error) {
      return error
    }
  }



  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    try {
      const user = await this.authService.getProfile(req.user.sub);
      return user;
    } catch (error) {
      return error;
    }

  }

}
