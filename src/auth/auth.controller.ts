import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { getStatusCode } from '../utils/helperFunctions';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Request coming to controllers');
    try {
      const response = await this.authService.signUp(signUpDto);
      if (response.token) {
        res.cookie('token', response.token);
      }
      return response;
    } catch (error) {
      console.error('Unhandled exception:', error);
      const statusCode = getStatusCode(error);
      return {
        message: error.message,
        error: error.constructor.name,
        statusCode,
      };
    }
  }

  // @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token } = await this.authService.signIn(signInDto);

      if (token) {
        res.cookie('token', token);
      }
      return { token };
    } catch (error) {
      console.error('Unhandled exception:', error);
      const statusCode = getStatusCode(error);

      return {
        message: error.message,
        error: error.constructor.name,
        statusCode,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    try {
      const user = await this.authService.getProfile(req.body.user.sub);
      return user;
    } catch (error) {
      console.error('Unhandled exception:', error);
      const statusCode = getStatusCode(error);
      return {
        message: error.message,
        error: error.constructor.name,
        statusCode,
      };
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
      console.error('Unhandled exception:', error);
      const statusCode = getStatusCode(error);
      return {
        message: error.message,
        error: error.constructor.name,
        statusCode,
      };
    }
  }
}
