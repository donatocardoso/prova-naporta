import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from 'src/dtos/shared/address.dto';
import { CustomerDto } from 'src/dtos/shared/customer.dto';
import { ItemDto } from 'src/dtos/shared/item.dto';

export class OrderFilterDto {
  @ApiProperty()
  orderNumber: number;

  @ApiProperty()
  expectedDeliveryDate: Date;

  @ApiProperty({ type: CustomerDto })
  customer: CustomerDto;

  @ApiProperty({ type: AddressDto })
  deliveryAddress: AddressDto;

  @ApiProperty({ type: ItemDto })
  item: ItemDto;

  @ApiProperty()
  createdAt: Date;
}
