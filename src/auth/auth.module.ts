import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or mysql/sqlite
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true, // DEV ONLY
    }),
    UserModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
