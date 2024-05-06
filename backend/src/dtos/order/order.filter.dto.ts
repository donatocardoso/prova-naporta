import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from 'src/dtos/shared/address.dto';
import { CustomerDto } from 'src/dtos/shared/customer.dto';
import { ItemDto } from 'src/dtos/shared/item.dto';
import { PaginateDto } from 'src/dtos/shared/paginate.dto';

export class OrderFilterDto extends PaginateDto {
  @ApiProperty()
  orderNumber?: number;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  expectedDeliveryDate?: Date;

  @ApiProperty({ type: CustomerDto })
  customer?: CustomerDto;

  @ApiProperty({ type: AddressDto })
  deliveryAddress?: AddressDto;

  @ApiProperty({ type: ItemDto })
  item?: ItemDto;

  @ApiProperty()
  createdAt?: Date;
}
