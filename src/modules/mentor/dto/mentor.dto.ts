import { IsNotEmpty, IsString } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"

export class MentorDto{
    @PrimaryGeneratedColumn()
    mentor_id: number

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