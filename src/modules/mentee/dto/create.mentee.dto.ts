import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { BaseDto } from "src/base/dto/base.dto"

export class CreateMenteeDto extends BaseDto{
    @IsString()
    @IsNotEmpty()
    mentee_name: string
}