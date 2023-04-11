import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class AddAskingQuestionDto extends BaseDto {
  @ApiProperty({ example: 'Какие цели у программы?' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ example: 'Помочь молодым девушкам' })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
