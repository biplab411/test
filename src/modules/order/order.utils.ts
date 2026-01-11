import { BadRequestException } from '@nestjs/common';
import {
  ORDER_STATUS,
  ORDER_STATUS_TRANSITIONS,
} from './order.constants';

export function validateOrderTransition(
  current: ORDER_STATUS,
  next: ORDER_STATUS,
) {
  const allowedNextStates = ORDER_STATUS_TRANSITIONS[current];

  if (!allowedNextStates.includes(next)) {
    throw new BadRequestException(
      `Invalid order status transition: ${current} → ${next}`,
    );
  }
}
