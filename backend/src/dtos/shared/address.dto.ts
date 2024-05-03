import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  district: string;
}
