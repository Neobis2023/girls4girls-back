import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateOptionDto extends BaseDto {
  @ApiProperty({ example: 'Да' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  isCorrect: boolean;
}
