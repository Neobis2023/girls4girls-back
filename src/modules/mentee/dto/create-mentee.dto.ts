/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateMenteeDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  menteeName: string;
}
