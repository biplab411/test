import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corear } from './entity/corear.entity';
import { CorearService } from './corear.service';
import { CorearController } from './corear.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Corear])],
  providers: [CorearService],
  controllers: [CorearController],
  exports: [CorearService],
})
export class CorearModule {}
