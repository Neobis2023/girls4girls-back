import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  ValidationPipe,
  Put,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackStatusEnum } from './enum/feedback-status.enum';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { MailService } from '../mail/mail.service';

@ApiTags('Обратная связь/Отзывы')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly mailerService: MailService,
  ) {}

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
    @Query('feedbackId') feedbackId: number,
    @Query('status', new ValidationPipe({ transform: true }))
    status: FeedbackStatusEnum,
  ) {
    return await this.feedbackService.markAsStatus(feedbackId, status);
  }

  @Get('list/feedbacks')
  @ApiOperation({ summary: 'Получить список всех отзывов' })
  async getAll(@Query() listParamsDto: ListParamsDto) {
    return await this.feedbackService.getAllFeedbacks(listParamsDto);
  }

  @Get('/get/list/by/status')
  @ApiOperation({
    summary: 'Получить список отзывов пользователей по их статусу',
  })
  async getBystatus(
    @Query('status') status: FeedbackStatusEnum,
    @Query() listParamsDto: ListParamsDto,
  ) {
    return await this.feedbackService.listByStatus(status, listParamsDto);
  }

  @Delete('soft/remove')
  @ApiOperation({
    summary: 'Удаление отзыва , поменять статус isDeleted на true',
  })
  async remove(@Query('feedback_id') feedback_id: number) {
    return await this.feedbackService.softDelete(feedback_id);
  }

  @Post('post/response')
  async sendResponseForFeedback(
    @Param('email') email: string,
    @Body() content: string,
  ) {
    const response = await this.mailerService.sendResponseForUsersFeedback(
      email,
      content,
    );
    return response;
  }
}
