import { Controller, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    return { user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const hasUpdated = await this.usersService.update(id, updateUserDto);

    return {
      success: hasUpdated
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const hasDeleted = await this.usersService.remove(id);

    return {
      success: hasDeleted
    };
  }

  @Get(':id/expenses')
  async findExpenses(@Param('id') userId: string) {
    const data = await this.usersService.findExpenses(userId);

    return {
      userExpenses: data
    };
  }
}
