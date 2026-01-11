import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Corear } from '../../corear/entity/corear.entity';
import { ORDER_STATUS } from '../order.constants';

export enum DELIVERY_TYPE {
  EXPRESS = 'EXPRESS',
  NORMAL = 'NORMAL',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  pickupLat: number;

  @Column('float')
  pickupLng: number;

  @Column('float')
  dropLat: number;

  @Column('float')
  dropLng: number;

  @Column({
    type: 'enum',
    enum: DELIVERY_TYPE,
  })
  deliveryType: DELIVERY_TYPE;

  @Column({ type: 'varchar', length: 255 })
  packageDetails: string;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS,
    default: ORDER_STATUS.CREATED,
  })
  status: ORDER_STATUS;

  @ManyToOne(() => Corear, (corear) => corear.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  corear: Corear | null;
}
