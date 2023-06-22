import { ApiProperty } from '@nestjs/swagger';
import { QuestionAnswerDto } from './question-answer.dto';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseDto } from '../../../base/dto/base.dto';

export class ResponseToQuestionnaireDto extends BaseDto {
  userId?: number;

  @ApiProperty({
    example: 23,
    description: 'ID of a questionnaire',
  })
  @IsNumber()
  questionnaireId: number;

  @ApiProperty({ type: () => [QuestionAnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionAnswerDto)
  answers: QuestionAnswerDto[];
}
