import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  prize: number;
}
