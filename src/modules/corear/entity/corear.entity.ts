import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from '../../order/entity/order.entity';

@Entity('corears')
export class Corear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('int')
  lat: number;

  @Column('int')
  lng: number;

  // true = can accept new order
  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Order, (order) => order.corear)
  orders: Order[];
}
