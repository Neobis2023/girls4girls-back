import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entitiy';
import NewsService from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsService],
})
export class NewsModule {}
