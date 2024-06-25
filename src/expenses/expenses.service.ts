import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createExpenseDto: CreateExpenseDto) {
    const expense = await this.prismaService.expense.create({
      data: { userId, ...createExpenseDto, date: new Date(createExpenseDto.date) }
    });

    return expense;
  }

  async findOne(id: string) {
    const expense = await this.prismaService.expense.findUnique({ where: { id } });

    if (!expense) {
      throw new NotFoundException('Expense data not found.');
    }

    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.prismaService.expense.update({
      data: updateExpenseDto,
      where: { id }
    });

    return expense ? true : false;
  }

  async remove(id: string) {
    const expense = await this.prismaService.expense.delete({ where: { id } });

    return expense ? true : false;
  }
}
