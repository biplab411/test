import { DELIVERY_TYPE } from '../entity/order.entity';

export class CreateOrderDto {
  pickupLat: number;
  pickupLng: number;
  dropLat: number;
  dropLng: number;

  deliveryType: DELIVERY_TYPE;

  packageDetails: string;
}
