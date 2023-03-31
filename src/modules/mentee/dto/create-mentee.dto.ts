/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateMenteeDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  mentee_id:number

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  mentor_id:number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  training_id:number
  
}
