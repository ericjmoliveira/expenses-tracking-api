import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}
