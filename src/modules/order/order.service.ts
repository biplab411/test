import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ORDER_STATUS } from './order.constants';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  // ===============================
  // CREATE ORDER
  // ===============================
  async create(dto: CreateOrderDto): Promise<Order> {
    try {
      // 1️⃣ Create order entity
      const order = this.orderRepo.create({
        ...dto,
        status: ORDER_STATUS.CREATED,
      });

      // 2️⃣ Save order
      return await this.orderRepo.save(order);
    } catch (error) {
      console.error('Create order error:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  // ===============================
  // FIND ALL ORDERS
  // ===============================
  async findAll(): Promise<Order[]> {
    try {
      // 1️⃣ Fetch all orders with corear relation
      return await this.orderRepo.find({
        relations: ['corear'],
      });
    } catch (error) {
      console.error('Find all orders error:', error);
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  // ===============================
  // FIND ORDER BY ID
  // ===============================
  async findOne(id: number): Promise<Order> {
    try {
      // 1️⃣ Fetch order by id
      const order = await this.orderRepo.findOne({
        where: { id },
        relations: ['corear'],
      });

      // 2️⃣ Validate existence
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Find order error:', error);
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================
  async updateStatus(
    id: number,
    dto: UpdateOrderStatusDto,
  ): Promise<Order> {
    try {
      // 1️⃣ Fetch existing order
      const order = await this.findOne(id);

      // 2️⃣ Update status
      order.status = dto.status;

      // 3️⃣ Save order
      return await this.orderRepo.save(order);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Update order status error:', error);
      throw new InternalServerErrorException(
        'Failed to update order status',
      );
    }
  }
}
