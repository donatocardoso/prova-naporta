import { ApiProperty } from '@nestjs/swagger';

export class AuthorizedDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  token: string;
}
