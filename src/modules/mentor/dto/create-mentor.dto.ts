import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateMentorDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  mentorName: string;

  @IsString()
  @IsNotEmpty()
  jobTtle: string;

  @IsString()
  @IsNotEmpty()
  info: string;
}
