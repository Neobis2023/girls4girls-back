import { IsNotEmpty, IsString } from "class-validator"

export class MentorDto{
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