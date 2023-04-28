import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { Client } from './decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserAuthType } from './dto/user-auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    return await this.userService.signUp(userSignUpDto);
  }
  @Post('signin')
  async signIn(@Body() userSignUpDto: UserSignUpDto) {
    return await this.userService.signIn(userSignUpDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async test(@Client() user: UserAuthType) {
    return await this.userService.getProfileInfo(user);
  }

  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  
}
