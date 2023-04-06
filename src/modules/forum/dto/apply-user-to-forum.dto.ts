import { BaseDto } from '../../../base/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ApplyUserToForumDto extends BaseDto {
  @ApiProperty({
    example: 1,
    description: 'Forum id',
  })
  @Type(() => Number)
  @IsNumber()
  forumId: number;

  userId?: number;

  @ApiProperty({
    example: 3,
    description: 'Questionnaire response ID',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  questionnaireResponseId: number;
}
