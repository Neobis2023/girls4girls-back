import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateNewsDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  titleKG?: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  descriptionKG?: string;

  @IsNotEmpty()
  @IsNumber()
  imageId: number;

  @IsNotEmpty()
  @IsNumber()
  commentId: number;

  @IsNotEmpty()
  @IsNumber()
  likeId: number;
}
