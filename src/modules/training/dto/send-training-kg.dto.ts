import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendTrainingKgDto {
  @ApiProperty({
    example: 'Название тренинга на кыргызском',
    description: 'Название тренинга на кыргызском',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Описание тренинга на кыргызском',
    description: 'Описание тренинга на кыргызском',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Локация тренинга на кыргызском',
    description: 'Локация тренинга на кыргызском',
  })
  @IsString()
  @IsOptional()
  location: string;
}
