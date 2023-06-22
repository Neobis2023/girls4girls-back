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
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Post('respond')
  @ApiOperation({
    summary: 'Админ : Написать обратное сообщение для отзыва пользователя',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Адрес электронной почты получателя',
          example: 'player@gmail.com',
        },
        message: {
          type: 'string',
          description: 'Обратная связь ответное сообщение',
          example:
            'Мы благодарны за ваш отзыв. Мы будем работать над улучшением нашей работы/услуги, чтобы удовлетворить ваши потребности.',
        },
      },
    },
  })
  async respondToFeedback(@Body() data: { email: string; message: string }) {
    const { email, message } = data;
    await this.mailerService.respondToFeedback(email, message);
    return 'Сообщение было успешно отправлено!';
  }
}
