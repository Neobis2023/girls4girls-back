import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditStatisticsDto {
  @ApiProperty({ example: '200+' })
  @IsNotEmpty()
  @IsString()
  trainigs: string;

  @ApiProperty({ example: '10' })
  @IsNotEmpty()
  @IsString()
  graduates: string;

  @ApiProperty({ example: '6' })
  @IsNotEmpty()
  @IsString()
  regions: string;
}
