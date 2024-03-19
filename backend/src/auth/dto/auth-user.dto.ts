import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o usuario.' })
  user: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar a senha.' })
  password: string;
}
