import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TranslateDTO {
  @ApiProperty({
    example: 'russian',
  })
  @IsString()
  from: string;

  @ApiProperty({
    example: 'kyrgyz',
  })
  @IsString()
  to: string;

  @ApiProperty({
    example: 'Текст для перевода',
  })
  @IsString()
  query: string;
}
