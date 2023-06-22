import { QuestionType } from '../enum/question-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionAnswerDto {
  @ApiProperty({
    example: 20,
    description: 'Question ID',
  })
  @Type(() => Number)
  @IsNumber()
  questionId: number;

  @ApiProperty({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.TEXT,
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    example: 1,
    description: 'Index of an answer of a variant quesiton',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  answerIndex?: number;

  @ApiProperty({ type: [Number], example: [0, 1] })
  @IsOptional()
  multipleChoices?: number[];

  @ApiProperty({
    example: 'Text answers',
  })
  @IsString()
  @IsOptional()
  text?: string;
}
