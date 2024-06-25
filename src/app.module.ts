import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, ExpensesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
