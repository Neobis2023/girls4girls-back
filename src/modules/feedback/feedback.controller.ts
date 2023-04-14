import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
  Put,
  Query,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackStatusEnum } from './enum/feedback-status.enum';
import { ListParamsDto } from 'src/base/dto/list-params.dto';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Зарегистрированный пользователь : Написать фидбэк',
  })
  create(@Req() req: any, @Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(req.user?.id, createFeedbackDto);
  }

  @Get('list/statuses')
  @ApiOperation({
    summary: 'Список статусов для фидбэков',
  })
  async findLustStatus() {
    return await this.feedbackService.findAllFeedbackStatuses();
  }

  @Put('/newStatus/:feedbackId/:status')
  @ApiOperation({ summary: 'Присвоить статус для фидбэка' })
  async updateFeedbackStatus(
    @Param('feedbackId') feedbackId: number,
    @Param('status', new ValidationPipe({ transform: true }))
    status: FeedbackStatusEnum,
  ) {
    return await this.feedbackService.markAsStatus(feedbackId, status);
  }

  @Get('list/feedbacks')
  @ApiOperation({ summary: 'Get list of all feedbacks' })
  async getAllFeedbacks(
    @Query() listParamsDto: ListParamsDto ){
    return await this.feedbackService.listWithRelations(listParamsDto, 'feedback' , ['user'])
  }

  @Get('/get/list/by/status')
  @ApiOperation({summary: 'Get list of feedbacks by status'})
  async getBystatus(
    @Query('status') status: FeedbackStatusEnum,
    @Query() listParamsDto: ListParamsDto
  ){
    return await this.feedbackService.listByStatus(status , listParamsDto)
  }

}
