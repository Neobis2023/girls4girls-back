import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { QuizService } from '../services/quiz.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';

@ApiTags('Квизы')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @ApiOperation({ summary: 'Получить все квизы' })
  @Get('/')
  async getAllQuiz(@Query() listParamsDto: ListParamsDto) {
    return await this.quizService.list(listParamsDto);
  }

  @ApiOperation({ summary: 'Получить квиз по id' })
  @Get('/:id')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @ApiOperation({ summary: 'Создать квиз' })
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() quizData: CreateQuizDto) {
    return await this.quizService.createNewQuiz(quizData);
  }
  @ApiOperation({ summary: 'Удалить квиз' })
  @Delete('/remove/:id')
  async removeQuiz(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.deleteOne(id);
  }
}
