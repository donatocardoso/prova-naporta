import { ApiProperty } from '@nestjs/swagger';
import { PaginateDto } from 'src/dtos/shared/paginate.dto';

export class UserFilterDto extends PaginateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  login?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  active?: boolean;

  @ApiProperty()
  createdAt?: Date;
}
