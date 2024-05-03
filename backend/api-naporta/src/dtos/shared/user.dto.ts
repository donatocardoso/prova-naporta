import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;
}
