import { Module } from '@nestjs/common';
import { JetonService } from './jeton.service';
import { JetonController } from './jeton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jeton } from './entities/jeton.entity';
import { ImageModule } from '../image/image.module';
import { CardInfo } from './entities/card-info.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jeton, CardInfo]),
    ImageModule,
    UserModule,
  ],
  controllers: [JetonController],
  providers: [JetonService],
  exports: [JetonService],
})
export class JetonModule {}
