import { BaseDto } from '../../../base/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ApplyUserToTrainingDto extends BaseDto {
  @ApiProperty({
    example: 1,
    description: 'Training id',
  })
  @Type(() => Number)
  @IsNumber()
  trainingId: number;

  @ApiProperty({
    example: 10,
    description: 'User id',
  })
  @Type(() => Number)
  @IsNumber()
  userId: number;
}
