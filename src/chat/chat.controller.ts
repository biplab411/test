import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChatService, Message } from './chat.service';
@Controller('/api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // ✅ POST /messages
  @Post('/messages')
  async sendMessage(
    @Body() body: { message: string; conversationId?: string },
  ) {
    try {
      if (!body.message || body.message.trim() === '') {
        throw new BadRequestException('Message is required');
      }

      const result = await this.chatService.sendMessage(
        body.message,
        body.conversationId,
      );

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Failed to send message');
    }
  }

  // ✅ GET /conversations/:id
  @Get('/conversations/:id')
  async getConversation(
    @Param('id') id: string,
  ): Promise<{ success: boolean; data: Message[] }> {
    try {
      if (!id) {
        throw new BadRequestException('Conversation ID is required');
      }

      const conversation = await this.chatService.getConversation(id);

      return {
        success: true,
        data: conversation,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Failed to fetch conversation');
    }
  }

  // ✅ GET /conversations
  @Get('/conversations')
  async getAllConversations() {
    try {
      const conversations =
        await this.chatService.getAllConversations();

      return {
        success: true,
        data: conversations,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException(
        'Failed to fetch conversations',
      );
    }
  }

  // ✅ DELETE /conversations/:id
  @Delete('/conversations/:id')
  async deleteConversation(@Param('id') id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Conversation ID is required');
      }

      const deleted =
        await this.chatService.deleteConversation(id);

      if (!deleted) {
        throw new NotFoundException('Conversation not found');
      }

      return {
        success: true,
        message: 'Conversation deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException(
        'Failed to delete conversation',
      );
    }
  }
}