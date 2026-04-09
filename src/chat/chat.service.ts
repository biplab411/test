import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { AgentService } from '../agents/agent.service';
import { v4 as uuid } from 'uuid';

// ✅ EXPORT FIX (important)
export interface Message {
    role: 'user' | 'agent';
    message: string;
    timestamp: Date;
}

@Injectable()
export class ChatService {
    constructor(private readonly agentService: AgentService) { }

    private conversations: Map<string, Message[]> = new Map();

    // ✅ Send Message
    async sendMessage(message: string, conversationId?: string) {
        try {
            const id = conversationId || uuid();
            const history = this.conversations.get(id) || [];

            const response = await this.agentService.process(message);

            const userMessage: Message = {
                role: 'user',
                message,
                timestamp: new Date(),
            };

            const agentMessage: Message = {
                role: 'agent',
                message: response,
                timestamp: new Date(),
            };

            history.push(userMessage, agentMessage);
            this.conversations.set(id, history);

            return {
                conversationId: id,
                response,
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }

    // ✅ Get Single Conversation
    async getConversation(id: string): Promise<Message[]> {
        try {
            const conversation = this.conversations.get(id);

            if (!conversation) {
                throw new NotFoundException('Conversation not found');
            }

            return conversation;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }

    // ✅ Get All Conversations
    async getAllConversations() {
        try {
            return Array.from(this.conversations.entries()).map(
                ([conversationId, messages]) => ({
                    conversationId,
                    messages,
                }),
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }

    // ✅ Delete Conversation
    async deleteConversation(id: string): Promise<boolean> {
        try {
            const exists = this.conversations.has(id);

            if (!exists) {
                throw new NotFoundException('Conversation not found');
            }

            this.conversations.delete(id);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }
}