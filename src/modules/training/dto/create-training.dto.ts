import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsOptional, IsString } from "class-validator";
import { BaseDto } from "src/base/dto/base.dto";
import { Image } from "src/modules/image/entities/image.entity";


export class CreateTrainingDto extends BaseDto{
    @ApiProperty({
        example: 'Female body',
        description: 'Title of training'
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example:'From high peaks to lush valleys, hard planes, and soft edges',
        description:  'Training description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 'Bokonbaeva 101',
        description: 'Address of the training'
    })
    @IsString()
    @IsNotEmpty()
    address: string

    @ApiProperty()
    @IsOptional()
    image: Image []
}
