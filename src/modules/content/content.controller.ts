import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { EditFooterDto } from './dto/edit-footer.dto';
import { ApiOperation } from '@nestjs/swagger';
import { EditStatisticsDto } from './dto/edit-statistics.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getWholeContent(@Query() listParamsDto: ListParamsDto) {
    return await this.contentService.listWithRelations(
      listParamsDto,
      'Content',
      ['statistics', 'footer', 'questions'],
    );
  }

  @ApiOperation({ summary: 'Редактировать футер' })
  @Put('/footer/:id')
  async editFooter(@Param('id') id: number, @Body() footer: EditFooterDto) {
    return await this.contentService.editFooter(id, footer);
  }

  // @ApiOperation({ summary: 'Редактировать статистику' })
  // @Put('/statistics/:id')
  // async editStatistics(
  //   @Param('id') id: number,
  //   @Body() statisctics: EditStatisticsDto,
  // ) {
  //   return await this.contentSeervice.editStatistics(id, statisctics);
  // }
}
