import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateQuestionDto extends BaseDto {
  @ApiProperty({ example: '2 + 2 = 4?' })
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quizid: number;
}
