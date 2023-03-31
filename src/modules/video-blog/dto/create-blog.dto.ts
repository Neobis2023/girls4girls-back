import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';
import { Image } from 'src/modules/image/entities/image.entity';

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

  @ApiProperty({ example: 'здесь будет ссылка на фото' })
  @IsNotEmpty()
  @IsString()
  lecturerImage: Express.Multer.File;

  @ApiProperty({ example: [1, 2] })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number[];
}
