import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDTO } from './user.dto';
import { Public } from 'src/auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Public()
  @Get()
  getHello(): any {
    return this.appService.findAll();
  }

  @Post()
  postHello(@Body() user: CreateUserDTO): Promise<User> {
    return this.appService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: CreateUserDTO) {
    return this.appService.updateOne(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.deleteOne(id);
  }
}
