import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { EditFooterDto } from './dto/edit-footer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EditStatisticsDto } from './dto/edit-statistics.dto';
import { AddAskingQuestionDto } from './dto/add-question.dto';

@ApiTags('Контент в админ панели')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @ApiOperation({ summary: 'Вывести контент' })
  @Get()
  async getWholeContent() {
    return await this.contentService.getContent();
  }

  @ApiOperation({ summary: 'Редактировать футер' })
  @Put('/footer')
  async editFooter(@Body() footer: EditFooterDto) {
    return await this.contentService.editFooter(footer);
  }

  @ApiOperation({ summary: 'Редактировать статистику' })
  @Put('/statistics')
  async editStatistics(@Body() statisctics: EditStatisticsDto) {
    return await this.contentService.editStatistics(statisctics);
  }

  @ApiOperation({ summary: 'Добавить вопрос' })
  @Post('/question')
  async addQuestion(@Body() question: AddAskingQuestionDto) {
    return await this.contentService.addOneQuestion(question);
  }

  @ApiOperation({ summary: 'Добавить вопрос' })
  @Delete('/question/:id')
  async deleteQuestion(@Param('id') id: number) {
    return await this.contentService.deleteOneQuestion(id);
  }
}
