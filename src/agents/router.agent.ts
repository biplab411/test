import { Injectable } from '@nestjs/common';

@Injectable()
export class RouterAgent {
  route(message: string): string {
    const msg = message.toLowerCase();
    if (msg.includes('order')) return 'order';
    if (msg.includes('payment') || msg.includes('invoice')) return 'billing';
    return 'support';
  }
}