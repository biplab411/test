import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ===============================
  // CREATE ORDER
  // ===============================
  @Post()
  async create(@Body() dto: CreateOrderDto) {
    try {
      return await this.orderService.create(dto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('OrderController create error:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  // ===============================
  // FIND ALL ORDERS
  // ===============================
  @Get()
  async findAll() {
    try {
      return await this.orderService.findAll();
    } catch (error) {
      console.error('OrderController findAll error:', error);
      throw new InternalServerErrorException(
        'Failed to fetch orders',
      );
    }
  }

  // ===============================
  // FIND ORDER BY ID
  // ===============================
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.orderService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('OrderController findOne error:', error);
      throw new InternalServerErrorException(
        'Failed to fetch order',
      );
    }
  }

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    try {
      return await this.orderService.updateStatus(id, dto);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error(
        'OrderController updateStatus error:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to update order status',
      );
    }
  }
}
