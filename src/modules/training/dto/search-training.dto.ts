import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SearchTrainingDto{
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
    @IsOptional()
    description?: string

}
