import { IsNotEmpty, IsString } from "class-validator"
import { BaseDto } from "src/base/dto/base.dto"

export class CreateMentorDto extends BaseDto{
    @IsString()
    @IsNotEmpty()
    mentor_name: string

    @IsString()
    @IsNotEmpty()
    job_title: string

    @IsString()
    @IsNotEmpty()
    info: string
}