import { BaseDto } from '../../../base/dto/base.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAccountDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
