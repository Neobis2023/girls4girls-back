import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class CreateCategoryDto extends BaseDto {
  @ApiProperty({ example: 'Здоровье' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ден-соолук' })
  @IsString()
  @IsOptional()
  nameKG: string;
}
