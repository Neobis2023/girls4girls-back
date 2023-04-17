import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { Repository } from 'typeorm';
import { QuestionnaireQuestion } from './entities/questionnaire-question.entity';
import { Variant } from './entities/variant.entity';
import { QuestionnaireResponse } from './entities/questionnaire-response.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { ResponseToQuestionnaireDto } from './dto/response-to-questionnaire.dto';
import { BaseService } from '../../base/base.service';
import { UserService } from '../user/user.service';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuestionType } from './enum/question-type.enum';

@Injectable()
export class QuestionnaireService extends BaseService<Questionnaire> {
  constructor(
    @InjectRepository(Questionnaire)
    private questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(QuestionnaireQuestion)
    private questionRepository: Repository<QuestionnaireQuestion>,
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    @InjectRepository(QuestionnaireResponse)
    private responseRepository: Repository<QuestionnaireResponse>,
    @InjectRepository(QuestionAnswer)
    private questionAnswerRepository: Repository<QuestionAnswer>,
    private readonly userService: UserService,
  ) {
    super(questionnaireRepository);
  }

  async listQuestionnaires() {
    const questionnaires = await this.questionnaireRepository.find({
      relations: ['questions', 'questions.variants'],
    });

    return questionnaires;
  }

  async createQuestionnaire(createQuestionnaireDto: CreateQuestionnaireDto) {
    const { name, questions } = createQuestionnaireDto;

    let questionnaire = new Questionnaire();
    questionnaire.name = name;
    questionnaire = await this.questionnaireRepository.save(questionnaire);

    for await (const createQuestionDto of questions) {
      const {
        text,
        textKG = null,
        description,
        descriptionKG = null,
        variants,
        type,
        correctVariantIndex,
      } = createQuestionDto;

      let question = new QuestionnaireQuestion();
      question.text = text;
      question.textKG = textKG;
      question.description = description;
      question.descriptionKG = descriptionKG;
      question.questionnaire = questionnaire;
      question.type = type;
      question = await this.questionRepository.save(question);
      if (!variants) continue;
      for await (const [index, createVariantDto] of variants.entries()) {
        const { text } = createVariantDto;

        const variant = new Variant();
        variant.text = text;
        variant.question = question;

        await this.variantRepository.save(variant);

        if (index === correctVariantIndex) {
          question.correctVariant = variant;
        }
      }
    }

    return questionnaire;
  }

  async getQuestionnaireById(id: number) {
    const questionnaire = this.questionnaireRepository.findOne({
      where: {
        id,
      },
      relations: ['questions.variants'],
    });
    return questionnaire;
  }

  async responseToQuestionnaire(
    responseToQuestionnaire: ResponseToQuestionnaireDto,
  ) {
    const { userId, questionnaireId, answers } = responseToQuestionnaire;
    const questionnaire = await this.get(questionnaireId);
    if (!questionnaire) {
      throw new BadRequestException(
        `Questionnaire with id ${questionnaireId} is not found!`,
      );
    }

    const user = await this.userService.get(userId);
    let response = new QuestionnaireResponse();
    response.user = user;
    response.questionnaire = questionnaire;
    response = await this.responseRepository.save(response);

    for await (const answer of answers) {
      const { questionId, type, answerIndex, multipleChoices, text } = answer;
      const question = await this.questionRepository.findOne({
        where: { id: questionId },
        relations: ['variants'],
      });

      if (!question) {
        throw new BadRequestException(
          `Question with ID ${questionId} is not found!`,
        );
      }

      let questionAnswer = new QuestionAnswer();
      questionAnswer.question = question;
      questionAnswer.response = response;
      questionAnswer.questionText = question.text;
      questionAnswer.questionTextKG = question.textKG;
      questionAnswer.type = type;
      if (type === QuestionType.TEXT) {
        if (!text) {
          throw new BadRequestException(
            `Question with ID ${questionId} is of type ${type}, but text is not provided!`,
          );
        }
        questionAnswer.text = text;
      } else if (
        type === QuestionType.VARIANTS ||
        type === QuestionType.DROP_DOWN
      ) {
        if (answerIndex == null) {
          throw new BadRequestException(
            `Question with ID ${questionId} is of type ${type}, but answerIndex is not provided!`,
          );
        }
        questionAnswer.answerIndex = answerIndex;
        questionAnswer.answerText = question?.variants[answerIndex]?.text;
      } else if (type === QuestionType.CHECK_BOX) {
        if (!multipleChoices) {
          throw new BadRequestException(
            `Question with ID ${questionId} is of type ${type}, but multipleChoices is not provided!`,
          );
        }
        const choices = [];
        for (const index of multipleChoices) {
          choices.push(question?.variants[index]?.text);
        }
        questionAnswer.multipleChoices = choices;
      }

      questionAnswer = await this.questionAnswerRepository.save(questionAnswer);
    }

    return response;
  }

  async listResponsesByQuestionnaireId(questionnaireId: number) {
    const responses = await this.responseRepository.find({
      where: {
        questionnaire: { id: questionnaireId },
      },
      relations: ['user', 'questionnaire', 'questionAnswers'],
    });

    return responses;
  }
}

const questionnaire = {
  name: 'Менторство',
  questions: [
    {
      text: 'Что такое менторство?',
      type: 'TEXT',
      variants: [
        {
          text: '',
        },
      ],
    },
    {
      text: 'Кто такой ментор?',
      type: 'VARIANTS',
      variants: [
        {
          text: 'Человек который всю жизнь работал на поле',
        },
        {
          text: 'Человек который на один шаг впереди тебя',
        },
        {
          text: 'Учитель',
        },
      ],
    },
  ],
};
