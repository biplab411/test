import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from './modules/order/order.module';
import { CorearModule } from './modules/corear/corear.module';
import { UserModule } from './user/user.module';

import { User } from './user/entity/user.entity';
import { Corear } from './modules/corear/entity/corear.entity';
import { Order } from './modules/order/entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or postgres
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'my_db',
      entities: [User, Corear, Order],
      synchronize: true, // ⚠ dev only
    }),
    OrderModule,
    CorearModule,
    UserModule,
  ],
})
export class AppModule {}
