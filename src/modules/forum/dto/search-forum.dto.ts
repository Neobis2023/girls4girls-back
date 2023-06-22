import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchForumDto {
  @ApiProperty({
    example: 'Female body',
    description: 'Title of forum',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'From high peaks to lush valleys, hard planes, and soft edges',
    description: 'Forum description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
