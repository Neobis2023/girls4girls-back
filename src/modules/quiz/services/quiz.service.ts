import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { BaseService } from 'src/base/base.service';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';

@Injectable()
export class QuizService extends BaseService<Quiz> {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Quiz)
    private optionRepository: Repository<Option>,
    @InjectRepository(VideoBlog)
    private readonly blogRepo: Repository<VideoBlog>,
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
    console.log(videoBlog);
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
}
