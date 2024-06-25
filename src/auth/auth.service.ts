import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: signInDto.email },
      include: { expenses: true }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const correctPassword = await compare(signInDto.password, user.password);

    if (!correctPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { sub: user.id, email: user.email };

    user.password = undefined;

    return { user, accessToken: await this.jwtService.signAsync(payload) };
  }

  async signUp(signUpDto: SignUpDto) {
    const hashPassword = await hash(signUpDto.password, 10);
    signUpDto.password = hashPassword;

    const isEmailAlreadyTaken = await this.prismaService.user.findUnique({
      where: { email: signUpDto.email }
    });

    if (isEmailAlreadyTaken) {
      throw new ConflictException('This email is alredy in use.');
    }

    const user = await this.prismaService.user.create({ data: signUpDto });

    const payload = { sub: user.id, email: user.email };

    user.password = undefined;

    return { user, accessToken: await this.jwtService.signAsync(payload) };
  }

  async verify(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { expenses: true }
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    user.password = undefined;

    return { user };
  }
}
