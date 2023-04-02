import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateBlogDto extends BaseDto {
  @ApiProperty({ example: 'https://www.youtube.com/embed/l-ooCKssPv4' })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  videoUrl: string;

  @ApiProperty({ example: 'Менторская программа и тренинги' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'В этом видео вы узнаете от сооснователей программы «Girls for Girls» об истории создания проекта, менторской программе, тренингов и о разных нюансах в работе.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Имя Фамилия' })
  @IsNotEmpty()
  @IsString()
  lecturerName: string;

  @ApiProperty({ example: 'Ментор' })
  @IsNotEmpty()
  @IsString()
  lecturerInfo: string;

  @ApiProperty()
  lecturerImage: Express.Multer.File;

  @ApiProperty({ example: ['hEaLTh', 'Business'], type: String, isArray: true })
  @IsNotEmpty()
  @IsString()
  category: string;
}
