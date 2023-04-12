import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TranslateService } from './translate.service';
import { TranslateController } from './translate.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'translator',
    }),
  ],
  controllers: [TranslateController],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {}
