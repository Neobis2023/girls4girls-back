import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchJetonDto {
  @ApiProperty({
    example: 'Title of a jeton',
    description: 'title of a jeton',
  })
  @IsString()
  title: string;
}
