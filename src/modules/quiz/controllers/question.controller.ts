import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from '../entities/question.entity';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Квизы')
@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @ApiOperation({ summary: 'Добавить вопрос' })
  @Post('')
  @UsePipes(ValidationPipe)
  async saveQuestion(@Body() question: CreateQuestionDto): Promise<Question> {
    const quiz = await this.quizService.getQuizById(question.quizid);
    return await this.questionService.createQuestion(question, quiz);
  }

  @ApiOperation({ summary: 'Удалить вопрос' })
  @Delete(':id')
  async deleteQuestion(@Param('id') id: number) {
    return await this.questionService.deleteOne(id);
  }
}
