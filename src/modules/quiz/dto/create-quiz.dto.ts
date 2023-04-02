import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateQuizDto extends BaseDto {
  @ApiProperty({ example: 'Математика' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Простые математические задачи' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  blogId: number;
}
