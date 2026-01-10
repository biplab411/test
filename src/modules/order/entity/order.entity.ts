import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import type { OrderStatus } from '../order.constants';
import { Corear } from '../../corear/entity/corear.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  pickupLat: number;

  @Column('int')
  pickupLng: number;

  @Column('int')
  dropLat: number;

  @Column('int')
  dropLng: number;

  @Column({ type: 'varchar', length: 10 })
  deliveryType: 'EXPRESS' | 'NORMAL';

  @Column({ type: 'varchar', length: 255 })
  packageDetails: string;

  @Column({ type: 'varchar', length: 20 })
  status: OrderStatus;

  @ManyToOne(() => Corear, (corear) => corear.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  corear: Corear | null;
}
