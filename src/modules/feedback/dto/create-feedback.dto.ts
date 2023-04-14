import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateFeedbackDto extends BaseDto {
  @ApiProperty({
    example: 'Тренинг на тему Материнство',
    description: 'Title of feedback',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Всё было супер , побольше бы таких мероприятий',
    description: 'Body of your message',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
