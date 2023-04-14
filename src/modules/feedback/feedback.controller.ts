import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe, Put } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackStatusEnum } from './enum/feedback-status.enum';

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
  create(
    @Req() req:any,
    @Body() createFeedbackDto: CreateFeedbackDto
  ){
    return this.feedbackService.createFeedback(req.user?.id , createFeedbackDto )
  }

  @Get('list/statuses')
  @ApiOperation({
    summary: 'Список статусов для фидбэков'
  })
  async findLustStatus(){
    return await this.feedbackService.findAllFeedbackStatuses()
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

}
