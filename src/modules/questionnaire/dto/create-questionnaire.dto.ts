import { CreateQuestionDto } from './create-question.dto';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateQuestionnaireDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [CreateQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
