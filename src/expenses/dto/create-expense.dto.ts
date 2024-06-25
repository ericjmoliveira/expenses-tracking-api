import { IsDateString, IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
