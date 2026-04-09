import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // 👈 IMPORTANT (used in other modules)
})
export class DatabaseModule {}