import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';

import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Req() request: { user: { sub: string } },
    @Body() createExpenseDto: CreateExpenseDto
  ) {
    const userId = request.user.sub;
    const expense = await this.expensesService.create(userId, createExpenseDto);

    return {
      expense
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const expense = await this.expensesService.findOne(id);

    return {
      expense
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    const success = await this.expensesService.update(id, updateExpenseDto);

    return {
      success
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const success = await this.expensesService.remove(id);

    return {
      success
    };
  }
}
