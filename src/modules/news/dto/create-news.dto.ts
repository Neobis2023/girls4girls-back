import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateNewsDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
