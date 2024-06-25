import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto);

    return {
      user: data.user,
      accessToken: data.accessToken
    };
  }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);

    return {
      user: data.user,
      accessToken: data.accessToken
    };
  }

  @Get('/verify')
  @UseGuards(AuthGuard)
  async verify(@Req() request: { user?: { sub: string } }) {
    const data = await this.authService.verify(request.user.sub);

    return {
      user: data.user
    };
  }
}
