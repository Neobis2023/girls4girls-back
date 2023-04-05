import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { ResponseToQuestionnaireDto } from './dto/response-to-questionnaire.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Анкета')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка анкет' })
  list() {
    return this.questionnaireService.listQuestionnaires();
  }

  @Post()
  @ApiOperation({ summary: 'Создание анкеты' })
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.createQuestionnaire(
      createQuestionnaireDto,
    );
  }

  @Post('response')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Заполнение анкеты пользователями' })
  responseToQuestionnaire(
    @Req() req: any,
    @Body() responseToQuestionnaire: ResponseToQuestionnaireDto,
  ) {
    responseToQuestionnaire.userId = req.user?.id;
    return this.questionnaireService.responseToQuestionnaire(
      responseToQuestionnaire,
    );
  }

  @Get('response/:id')
  @ApiOperation({ summary: 'Получить список ответов по ID анкеты' })
  listResponsesByQuestionnaireId(@Param('id') id: number) {
    return this.questionnaireService.listResponsesByQuestionnaireId(id);
  }
}
