import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true, // DEV ONLY
    }),
    AuthModule,
    UserModule,
    OrderModule,
  ],
})
export class AppModule {}
