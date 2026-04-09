import { Module } from '@nestjs/common';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { AgentService } from './agents/agent.service';
import { RouterAgent } from './agents/router.agent';
import { SupportAgent } from './agents/support.agent';
import { OrderAgent } from './agents/order.agent';
import { BillingAgent } from './agents/billing.agent';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],   
  controllers: [ChatController],
  providers: [
    ChatService,
    AgentService,
    RouterAgent,
    SupportAgent,
    OrderAgent,
    BillingAgent,
  ],
})
export class AppModule {}