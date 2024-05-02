import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  cellphone: string;

  @ApiProperty()
  email: string;
}
