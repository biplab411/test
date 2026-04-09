import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrderAgent {
  constructor(private db: DatabaseService) {}

  handle(message: string): string {
    const order = this.db.getOrder('1');

    if (!order) {
      return 'Order not found';
    }

    return `Order status is ${order.status}, tracking ID: ${order.tracking}`;
  }
}