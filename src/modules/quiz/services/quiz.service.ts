import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { BaseService } from 'src/base/base.service';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';
import { CreateOptionDto } from '../dto/create-option.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { QuizResult } from '../entities/quiz-results.entity';
import { JetonService } from '../../jeton/jeton.service';
import { JetonType } from '../../jeton/enums/jeton-type.enum';

@Injectable()
export class QuizService extends BaseService<Quiz> {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizResult)
    private quizResultRepository: Repository<QuizResult>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Quiz)
    private optionRepository: Repository<Option>,
    @InjectRepository(VideoBlog)
    private readonly blogRepo: Repository<VideoBlog>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly jetonService: JetonService,
  ) {
    super(quizRepository);
  }

  async getAllQuiz(): Promise<[Quiz[], number]> {
    return await this.quizRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .getManyAndCount();
  }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: {
        id: id,
      },
      relations: ['questions', 'questions.options'],
    });
  }

  async createNewQuiz(quiz: CreateQuizDto) {
    const videoBlog = await this.blogRepo.findOne({
      where: {
        id: quiz.blogId,
      },
      relations: ['quiz'],
    });
    const savedQuiz = await this.quizRepository.save(quiz);
    videoBlog.quiz = [savedQuiz];
    await this.blogRepo.save(videoBlog);
    return savedQuiz;
  }

  async deleteOne(id: number) {
    const quiz = await this.quizRepository.findOne({
      where: {
        id: id,
      },
      relations: ['questions', 'questions.options', 'videoBlog'],
    });
    return await this.quizRepository.remove(quiz);
  }

  async takeQuiz(
    userId: number,
    quizId: number,
    selectedOptionsIds: CreateOptionDto[],
  ) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['quizResults'],
    });
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: ['questions'],
    });
    if (!quiz) {
      throw new BadRequestException('Квиз не найден');
    }
    const allQuestions = quiz.questions.length;
    if (allQuestions != selectedOptionsIds.length) {
      throw new BadRequestException(
        'Количество ответов не равняется количеству выбранных вариантов',
      );
    }
    let correctAnswers = 0;
    for (let i = 0; i < selectedOptionsIds.length; i++) {
      if (selectedOptionsIds[i].isCorrect) {
        correctAnswers++;
      }
    }
    const isPassed = await this.quizResultRepository.findOne({
      where: { quiz: { id: quizId }, user: { id: userId } },
    });
    if (isPassed) {
      return this.jetonService.assignJetonForActivity(
        userId,
        user.quizResults.length,
        JetonType.TEST,
      );
    }
    const result = new QuizResult();
    result.quiz = quiz;
    result.correctAnwers = correctAnswers;
    result.questions = allQuestions;
    user.quizResults.push(result);
    const savedUser = await this.userRepo.save(user);
    await this.quizResultRepository.save(result);
    return this.jetonService.assignJetonForActivity(
      userId,
      savedUser.quizResults.length,
      JetonType.TEST,
    );
    // return `Questions number: ${allQuestions}, correct answers: ${correctAnswers}`;
  }

  async getAllResults(userId: number) {
    return await this.quizResultRepository.find({
      where: { user: { id: userId } },
      relations: ['quiz'],
    });
  }
}
