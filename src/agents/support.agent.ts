import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportAgent {
  handle(message: string) {
    return `Support Agent: I can help with FAQs. You said: ${message}`;
  }
}
