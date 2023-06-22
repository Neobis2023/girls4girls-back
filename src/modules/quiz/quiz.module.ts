import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './controllers/question.controller';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { QuestionService } from './services/question.service';
import { QuizController } from './controllers/quiz.controller';
import { Quiz } from './entities/quiz.entity';
import { QuizService } from './services/quiz.service';
import { OptionService } from './services/option.service';
import { OptionController } from './controllers/option.controller';
import { VideoBlog } from '../video-blog/entities/video-blog.entity';
import { User } from '../user/entities/user.entity';
import { QuizResult } from './entities/quiz-results.entity';
import { JetonModule } from '../jeton/jeton.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      Question,
      Option,
      VideoBlog,
      User,
      QuizResult,
    ]),
    JetonModule,
    UserModule,
  ],
  controllers: [QuizController, QuestionController, OptionController],
  providers: [QuizService, QuestionService, OptionService],
})
export class QuizModule {}
