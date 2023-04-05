import { ApplyStatus } from '../../../utils/enum/apply-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateUserApplicationDto {
  @ApiProperty({
    example: 5,
    description: 'User application id',
  })
  @Type(() => Number)
  @IsNumber()
  applicationId: number;

  @ApiProperty({
    type: 'enum',
    enum: ApplyStatus,
  })
  @IsEnum(ApplyStatus)
  applyStatus: ApplyStatus;
}
