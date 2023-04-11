import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {
    super(questionRepository);
  }

  async createQuestion(
    question: CreateQuestionDto,
    quiz: Quiz,
  ): Promise<Question> {
    const newQuestions = await this.questionRepository.save({
      question: question.question,
    });

    quiz.questions = [...quiz.questions, newQuestions];

    const excistingQuiz = await this.quizRepository.findOne({
      where: { id: quiz.id },
    });
    excistingQuiz.questions = quiz.questions;
    await this.quizRepository.save(excistingQuiz);
    return newQuestions;
  }
  async deleteOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id: id },
    });
    if (!question) {
      return;
    }
    return await this.questionRepository.remove(question);
  }
}
