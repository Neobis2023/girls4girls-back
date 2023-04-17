import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ToggleLikeDto {
  @ApiProperty({
    example: 2,
    description: 'ID видео-блога',
  })
  @Type(() => Number)
  @IsNumber()
  blogId: number;
}
