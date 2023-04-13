import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateMentorshipDto extends BaseDto {
  @ApiProperty({ example: 'Поток 1' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
