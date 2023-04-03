import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionDto } from '../dto/create-option.dto';
import { Option } from '../entities/option.entity';
import { Question } from '../entities/question.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class OptionService extends BaseService<Option> {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {
    super(optionRepository);
  }

  async createOption(option: CreateOptionDto, question: Question) {
    const newOption = await this.optionRepository.save({
      text: option.text,
      isCorrect: option.isCorrect,
    });

    const excistingQuestion = await this.questionRepository.findOne({
      where: { id: question.id },
      relations: ['options'],
    });
    excistingQuestion.options = [...excistingQuestion.options, newOption];
    await this.questionRepository.save(excistingQuestion);
    console.log(excistingQuestion);
    return newOption;
  }

  async deleteOne(id: number) {
    const option = await this.optionRepository.findOne({ where: { id: id } });
    if (option) return await this.optionRepository.remove(option);
    return;
  }
}
