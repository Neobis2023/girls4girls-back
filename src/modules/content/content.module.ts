import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AskingQuestions } from './entities/ask-questions.entity';
import { ContentFooter } from './entities/footer.entity';
import { ContentStatistics } from './entities/statistics.entity';
import { ContentController } from './content.controller';
import { Content } from './entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      AskingQuestions,
      ContentFooter,
      ContentStatistics,
    ]),
  ],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
