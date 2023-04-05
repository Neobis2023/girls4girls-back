import { CreateQuestionnaireQuestionDto } from './create-questionnaire-question.dto';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateQuestionnaireDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [CreateQuestionnaireQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionnaireQuestionDto)
  questions: CreateQuestionnaireQuestionDto[];
}
