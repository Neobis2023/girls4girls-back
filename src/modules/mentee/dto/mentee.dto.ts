import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class MenteeDto{
    @IsString()
    @IsNotEmpty()
    mentee_name: string

    // @IsEmail()
    // @IsNotEmpty()
    // mentee_email: string
}