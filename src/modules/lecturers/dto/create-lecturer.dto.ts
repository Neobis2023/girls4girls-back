import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';
import { Image } from 'src/modules/image/entities/image.entity';

export class CreateLecturerDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lecturerFullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lecturerInfo: string;

  @ApiProperty()
  image: Image;
}
