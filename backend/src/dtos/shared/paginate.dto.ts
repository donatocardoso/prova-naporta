import { ApiProperty } from '@nestjs/swagger';

export class PaginateDto {
  @ApiProperty()
  page: number = 1;

  @ApiProperty()
  quantity: number = 5;
}
