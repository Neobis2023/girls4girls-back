import { BaseDto } from 'src/base/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Image } from 'src/modules/image/entities/image.entity';

export class CreateForumDto extends BaseDto {
  @ApiProperty({
    example: 'Female body',
    description: 'Forum of training',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'From high peaks to lush valleys, hard planes, and soft edges',
    description: 'Forum description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Bokonbaeva 101',
    description: 'Address of the training',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsOptional()
  images: Image[];

  @ApiProperty({
    description: 'Date of the forum',
    example: '2023-03-22T10:30:40.000Z',
  })
  @IsNotEmpty()
  eventDate: Date;

  @ApiProperty({
    description: 'Deadline for submitting an application to the forum',
    example: '2023-03-22T10:30:40.000Z',
  })
  @IsNotEmpty()
  deadlineDate: Date;

  @ApiProperty({
    description: 'Time of a training',
    example: '18:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  time: string;

  @ApiProperty({
    description: 'Location of a training',
    example: 'Наарынская область',
    required: false,
  })
  @IsString()
  @IsOptional()
  location: string;
}
