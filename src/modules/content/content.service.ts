import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { AskingQuestions } from './entities/ask-questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentFooter } from './entities/footer.entity';
import { ContentStatistics } from './entities/statistics.entity';
import { Content } from './entities/content.entity';
import { EditFooterDto } from './dto/edit-footer.dto';
import { EditStatisticsDto } from './dto/edit-statistics.dto';

@Injectable()
export class ContentService extends BaseService<Content> {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(AskingQuestions)
    private readonly askingQuestionsRepo: Repository<AskingQuestions>,
    @InjectRepository(ContentFooter)
    private readonly footerRepo: Repository<ContentFooter>,
    @InjectRepository(ContentStatistics)
    private readonly statisticsRepo: Repository<ContentStatistics>,
  ) {
    super(contentRepo);
  }

  async editFooter(id: number, newFooter: EditFooterDto) {
    const footer = await this.footerRepo.save(newFooter);
    const content = await this.contentRepo.findOne({
      where: { id: id },
      relations: ['footer'],
    });
    const allContent = await this.contentRepo.find()
    if (!content && isEmpty(allContent.)) {
      throw new BadRequestException('Введите id контента правильно');
    }
    content.footer = footer;
    return await this.contentRepo.save(content);
  }

  // async editStatistics(id: number, statisticsData: EditStatisticsDto) {
  //   const statistics = await this.statisticsRepo.findOne({ where: { id: id } });
  //   if (!statistics) {
  //     return await this.statisticsRepo.save(statistics);
  //   }
  //   Object.assign(statistics, statisticsData);
  //   log(statistics);
  //   // return await this.statisticsRepo.save(statistics);
  // }
}
