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
  image: Image[];

  @ApiProperty({
    description: 'Deadline of the forum',
    example: '2023-03-22T10:30:40.000Z',
  })
  @IsNotEmpty()
  endDate: Date;
}
