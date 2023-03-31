import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateCategoryDto extends BaseDto {
  @ApiProperty({ example: 'Health' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
