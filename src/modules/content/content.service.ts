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
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { AddAskingQuestionDto } from './dto/add-question.dto';

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

  async getContent() {
    let allContent = await this.listWithRelations(
      new ListParamsDto(),
      'Content',
      ['footer', 'questions', 'statistics'],
    );
    if (!allContent.data[0]) {
      await this.contentRepo.save(new Content());
      allContent = await this.listWithRelations(
        new ListParamsDto(),
        'Content',
        ['footer', 'questions', 'statistics'],
      );
    }
    const content = await this.getWithRelations(
      allContent.data[0].id,
      'Content',
      ['footer', 'questions', 'statistics'],
    );
    return content;
  }

  async editFooter(newFooter: EditFooterDto) {
    let allFooters = await this.footerRepo.find();
    if (!allFooters[0]) {
      await this.footerRepo.save(newFooter);
      allFooters = await this.footerRepo.find();
    }
    const footer = await this.footerRepo.findOne({
      where: { id: allFooters[0].id },
    });
    Object.assign(footer, newFooter);
    await this.footerRepo.save(footer);
    const content = await this.getContent();
    content.footer = footer;
    return await this.contentRepo.save(content);
  }

  async editStatistics(statisticsData: EditStatisticsDto) {
    let allStatistics = await this.statisticsRepo.find();
    if (!allStatistics[0]) {
      await this.statisticsRepo.save(statisticsData);
      allStatistics = await this.statisticsRepo.find();
    }
    const statistics = await this.statisticsRepo.findOne({
      where: { id: allStatistics[0].id },
    });
    Object.assign(statistics, statisticsData);
    await this.statisticsRepo.save(statistics);
    const content = await this.getContent();
    content.statistics = statistics;
    return await this.contentRepo.save(content);
  }

  async addOneQuestion(newQuestion: AddAskingQuestionDto) {
    const question = await this.askingQuestionsRepo.save(newQuestion);
    const content = await this.getContent();
    content.questions.push(question);
    return await this.contentRepo.save(content);
  }

  async deleteOneQuestion(id: number) {
    const question = await this.askingQuestionsRepo.findOne({
      where: { id: id },
    });
    if (!question) {
      throw new BadRequestException(`Вопроса с id:${id} нет в базе данных`);
    }
    return await this.askingQuestionsRepo.remove(question);
  }
}
