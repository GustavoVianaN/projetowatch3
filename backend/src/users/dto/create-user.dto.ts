import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o e-mail.' })
  user: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar a senha.' })
  password: string;
}
