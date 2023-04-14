import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { BaseService } from 'src/base/base.service';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FeedbackStatusEnum } from './enum/feedback-status.enum';
import { ListDto } from 'src/base/dto/list.dto';
import { ListParamsDto } from 'src/base/dto/list-params.dto';

@Injectable()
export class FeedbackService extends BaseService<Feedback> {
  constructor(
  @InjectRepository(Feedback)
  private readonly feedbackRepo: Repository<Feedback>,
  @InjectRepository(User)
  private readonly userRepo: Repository<User>
  ){
    super(feedbackRepo)
  }

  async createFeedback(
    user_id: number,
    createFeedbackDto: CreateFeedbackDto
  ):Promise<Feedback>{
    const feedback = new Feedback()
    const user = await this.userRepo.findOne({
      where:{id:user_id}
    })
    feedback.user = user
    feedback.absorbFromDto(createFeedbackDto)
    return await this.feedbackRepo.save(feedback)
  }

  async findAllFeedbackStatuses(){
    return FeedbackStatusEnum
  }

  async markAsStatus(
    feedback_id:number,
    status: FeedbackStatusEnum){
      const feedback = await this.feedbackRepo.findOne({
        where: {id:feedback_id},
        relations: ['user']
      })
      switch(status){
        case FeedbackStatusEnum.isRead:
          feedback.status = FeedbackStatusEnum.isRead
          return feedback
        case FeedbackStatusEnum.isFavorite:
          feedback.status = FeedbackStatusEnum.isFavorite
          return feedback
        case FeedbackStatusEnum.isDeleted:
          return await this.feedbackRepo.remove(feedback)
        default:
          throw new BadRequestException(`Invalid status: ${status}`)
      }
    }

  async listByStatus(
    status: FeedbackStatusEnum,
    listParamsDto: ListParamsDto,
  ){
    const array = await this.repository
      .createQueryBuilder('feedbacks')
      .where('feedbacks.status = :status' , {status})
      .leftJoinAndSelect('feedbacks.user','user')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(`feedbacks.${listParamsDto.getOrderedField()}`,listParamsDto.order)
      .getMany();

    const itemsCount = await this.repository.createQueryBuilder().getCount()
    return new ListDto(array,{
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    })
  }
}
