import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AddCharacterToUserDto {
  @ApiProperty({
    example: 'Tiffani',
    description: 'Character name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 2,
  })
  @Type(() => Number)
  @IsNumber()
  characterImageId: number;
}
