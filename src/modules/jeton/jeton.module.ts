import { Module } from '@nestjs/common';
import { JetonService } from './jeton.service';
import { JetonController } from './jeton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jeton } from './entities/jeton.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jeton])],
  controllers: [JetonController],
  providers: [JetonService],
})
export class JetonModule {}
