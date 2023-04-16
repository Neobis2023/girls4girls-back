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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { QuizService } from '../services/quiz.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard';
import { log } from 'console';
import { CreateOptionDto } from '../dto/create-option.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @ApiTags('Квизы для пользователей')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить результаты всех пройденныз квизов' })
  @Get('/result')
  async listResults(@Req() req: any) {
    return await this.quizService.getAllResults(req.user.id);
  }

  @ApiTags('Квизы для админа')
  @ApiOperation({ summary: 'Получить все квизы' })
  @Get('/')
  async getAllQuiz(@Query() listParamsDto: ListParamsDto) {
    return await this.quizService.list(listParamsDto);
  }

  @ApiTags('Квизы для админа')
  @ApiOperation({ summary: 'Создать квиз' })
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() quizData: CreateQuizDto) {
    return await this.quizService.createNewQuiz(quizData);
  }

  @ApiTags('Квизы для админа')
  @ApiOperation({ summary: 'Удалить квиз' })
  @Delete('/remove/:id')
  async removeQuiz(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.deleteOne(id);
  }

  @ApiTags('Квизы для пользователей')
  @ApiOperation({ summary: 'Получить квиз по id' })
  @Get('/:id')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @ApiTags('Квизы для пользователей')
  @ApiOperation({
    summary: 'Пройти квиз (если квиз уже пройден выведутся результаты)',
  })
  @Post('/pass/:quizId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async passQuiz(
    @Req() req: any,
    @Param('quizId') quizId: number,
    @Body() selectedOptionsIds: CreateOptionDto[],
  ) {
    const user = req.user;
    return this.quizService.takeQuiz(user.id, quizId, selectedOptionsIds);
  }
}
