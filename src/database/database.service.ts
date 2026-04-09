import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  conversations = new Map();

  orders = [
    { id: '1', status: 'shipped', tracking: 'TRK123' },
  ];

  invoices = [
    { id: 'inv1', amount: 100, status: 'paid' },
  ];

  getOrder(id: string) {
    return this.orders.find(o => o.id === id);
  }

  getInvoice(id: string) {
    return this.invoices.find(i => i.id === id);
  }
}
