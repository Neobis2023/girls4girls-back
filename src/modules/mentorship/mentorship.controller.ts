import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MentorshipService } from './mentorship.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { ApplyToMentorshipDto } from './dto/apply-to-mentorship.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Редактирование ментороской программы')
@Controller('mentorship')
export class MentorshipController {
  constructor(private readonly mentorshipService: MentorshipService) {}

  @ApiOperation({ summary: 'Создать менторский поток используя id анкеты' })
  @Post(':questionnaireId')
  async createMentoshipFlow(
    @Param('questionnaireId') questionnaireId: number,
    @Body() mentorshipData: CreateMentorshipDto,
  ) {
    return await this.mentorshipService.createOne(
      mentorshipData,
      questionnaireId,
    );
  }

  @ApiOperation({ summary: 'Подать заявку на менторскую программу' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/apply')
  async applyToMentorship(
    @Req() req: any,
    @Query() applyToMentorshipDto: ApplyToMentorshipDto,
  ) {
    applyToMentorshipDto.userId = req.user?.id;
    return await this.mentorshipService.applyToMentorship(applyToMentorshipDto);
  }

  @ApiOperation({ summary: 'Вывести все потоки менторской программы' })
  @Get()
  async getAllMetroships(@Query() liastParamsDto: ListParamsDto) {
    return await this.mentorshipService.listWithRelations(
      liastParamsDto,
      'Mentorship',
      ['questionnaire'],
    );
  }

  @Delete(':id')
  async deleteMentorship(@Param('id') id: number) {
    return await this.mentorshipService.deleteOne(id);
  }
}
