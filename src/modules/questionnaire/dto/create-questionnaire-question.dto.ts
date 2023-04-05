import { QuestionType } from '../enum/question-type.enum';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateVariantDto } from './create-variant.dto';

export class CreateQuestionnaireQuestionDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.TEXT,
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ type: () => [CreateVariantDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants: CreateVariantDto[];

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  correctVariantIndex?: number;
}
