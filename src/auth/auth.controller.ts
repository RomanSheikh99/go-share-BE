import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res,
  Req,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const response = await this.authService.signUp(signUpDto);
      if (response.token) {
        res.cookie('token', response.token);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const response = await this.authService.signIn(signInDto);
      if (response.token) {
        res.cookie('token', response.token);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    try {
      const user = await this.authService.getProfile(req.body.user.sub);
      return user;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('driver/:id')
  async getDriver(@Param('id') id: string) {
    try {
      console.log('hello');
      const user = await this.authService.getProfile(id);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
