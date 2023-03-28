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
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { MenteeService } from './mentee.service';

@ApiTags('Mentee')
@Controller('mentee')
export class MenteeController {
    constructor(private readonly menteeService: MenteeService){}

}