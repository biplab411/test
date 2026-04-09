import { Injectable } from '@nestjs/common';
import { RouterAgent } from './router.agent';
import { SupportAgent } from './support.agent';
import { OrderAgent } from './order.agent';
import { BillingAgent } from './billing.agent';

@Injectable()
export class AgentService {
  constructor(
    private router: RouterAgent,
    private support: SupportAgent,
    private order: OrderAgent,
    private billing: BillingAgent,
  ) {}

  process(message: string) {
    const route = this.router.route(message);

    switch (route) {
      case 'order':
        return this.order.handle(message);
      case 'billing':
        return this.billing.handle(message);
      default:
        return this.support.handle(message);
    }
  }
}