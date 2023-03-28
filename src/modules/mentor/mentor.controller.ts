import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    Get,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Query,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { MentorService } from './mentor.service';

@ApiTags('Mentors')
@Controller('mentors')
export class MentorsController {
    constructor(private readonly mentorService: MentorService){}

    @Post()
    @ApiOperation({summary: 'Создание нового ментора'})
    async createNewMentor(@Body() createMentorDto: CreateMentorDto){
        return await this.mentorService.addOne(createMentorDto)
    }
}