// src/corear/corear.entity.ts
import { Entity, PrimaryGeneratedColumn, Column,   OneToMany } from 'typeorm';
import { Order } from 'src/modules/order/entity/order.entity';
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

  // one corear can handle only one active order
  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Order, (order) => order.corear)
  orders: Order[];
}
