import { Module } from '@nestjs/common';
import { JetonService } from './jeton.service';
import { JetonController } from './jeton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jeton } from './entities/jeton.entity';
import { ImageModule } from '../image/image.module';
import { Image } from '../image/entities/image.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Jeton]), ImageModule, UserModule],
  controllers: [JetonController],
  providers: [JetonService],
})
export class JetonModule {}
