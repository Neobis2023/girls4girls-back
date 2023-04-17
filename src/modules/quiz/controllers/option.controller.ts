import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOptionDto } from '../dto/create-option.dto';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';

@ApiTags('Квизы для админа')
@Controller('question/options')
export class OptionController {
  constructor(
    private optionService: OptionService,
    private questionService: QuestionService,
  ) {}

  @ApiOperation({ summary: 'Добавить вариант вопроса' })
  @Post('')
  @UsePipes(ValidationPipe)
  async saveOptionToQuestion(@Body() createOption: CreateOptionDto) {
    const question = await this.questionService.get(createOption.questionId);
    const option = await this.optionService.createOption(
      createOption,
      question,
    );
    return { question, createOption, option };
  }

  @ApiOperation({ summary: 'Удалить вариант вопроса' })
  @Delete(':id')
  async deleteOption(@Param('id') id: number) {
    return await this.optionService.deleteOne(id);
  }
}
