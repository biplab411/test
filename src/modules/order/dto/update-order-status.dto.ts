import { IsIn } from 'class-validator';
import { ORDER_STATUS } from '../order.constants';

export class UpdateOrderStatusDto {
  @IsIn(Object.values(ORDER_STATUS))
  status: typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
}
