import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards,Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SingUpDTO } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { name: string, email: string }) {
    console.log("singin enformation",signInDto);
    return this.authService.signIn(signInDto.email, signInDto.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('singup')
  async signUp(@Body() signUpDto: SingUpDTO, @Res({ passthrough: true }) res: Response) {
    const response = await this.authService.singUp(signUpDto);
    res.cookie('token', response.token,{
      httpOnly: true, 
      domain: 'localhost:4200',
      secure: true,
      sameSite:'none'});
    console.log("singup enformation",response);
    return response;
  }


  //   @Post('singup')
  // async signUp(@Body() signUpDto: SingUpDTO, @Res() res: Response) {
  //   const response = await this.authService.singUp(signUpDto);

  //   // Set the "token" cookie in the response.
  //   res.cookie('token', response.token, {
  //     httpOnly: true, // Set the cookie as HttpOnly for security.
  //     // You can also specify other cookie options like 'secure', 'expires', 'path', etc.
  //   });

  //   console.log("Signup information", response);
  //   return res.status(HttpStatus.OK).json(response);
  // }



  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log("object");
    console.log(req);
    return req.user;
  }
}
