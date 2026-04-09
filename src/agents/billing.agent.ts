import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BillingAgent {
  constructor(private db: DatabaseService) {}

  handle(message: string) {
    const invoice = this.db.getInvoice('inv1');
    return `Billing Agent: Invoice ${invoice?.id} is ${invoice?.status}`;
  }
}