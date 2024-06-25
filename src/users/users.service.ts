import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { expenses: true }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.password = undefined;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto
    });

    return updatedUser ? true : false;
  }

  async remove(id: string) {
    const deletedUser = await this.prismaService.user.delete({ where: { id } });

    return deletedUser ? true : false;
  }

  async findExpenses(userId: string) {
    const userExpenses = await this.prismaService.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });

    return userExpenses;
  }
}
