import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { EditNewsDto } from './dto/edit-news.dto';
import { News } from './entities/news.entitiy';

@Injectable()
export default class NewsService extends BaseService<News> {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {
    super(newsRepo);
  }

  async addOne(createNews: CreateNewsDto) {
    return await this.newsRepo.save(createNews);
  }

  async editOne(newsId: number, editedNews: EditNewsDto) {
    const news = await this.newsRepo.findOne({ where: { id: newsId } });
    Object.assign(news, editedNews);
    return await this.newsRepo.save(news);
  }
}
