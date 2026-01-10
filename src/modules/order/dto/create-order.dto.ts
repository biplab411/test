import { IsInt, IsString, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  pickupLat: number;

  @IsInt()
  pickupLng: number;

  @IsInt()
  dropLat: number;

  @IsInt()
  dropLng: number;

  @IsIn(['EXPRESS', 'NORMAL'])
  deliveryType: 'EXPRESS' | 'NORMAL';

  @IsString()
  packageDetails: string;
}
