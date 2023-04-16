import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { SearchForumDto } from './dto/search-forum.dto';
import { Forum } from './entities/forum.entity';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { ListDto } from 'src/base/dto/list.dto';
import { ApplyUserToForumDto } from './dto/apply-user-to-forum.dto';
import { UserService } from '../user/user.service';
import { UserToForum } from './entities/users-to-forum.entity';
import { UpdateUserApplicationDto } from './dto/update-user-application.dto';
import { Questionnaire } from '../questionnaire/entities/questionnaire.entity';

@Injectable()
export class ForumService extends BaseService<Forum> {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepo: Repository<Forum>,
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly imageService: ImageService,
    @InjectRepository(UserToForum)
    private readonly userToForumRepository: Repository<UserToForum>,
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    private readonly userService: UserService,
  ) {
    super(forumRepo);
  }

  async createNewForum(
    createForumDto: CreateForumDto,
    file: Express.Multer.File,
  ) {
    const forum = new Forum();
    if (file) {
      const images: Image[] = [];
      const image = await this.imageService.createImage(file);
      images.push(image);
      createForumDto.images = images;
    }

    if (createForumDto.questionnaireId) {
      const questionnare = await this.questionnaireRepository.findOneBy({
        id: createForumDto.questionnaireId,
      });
      forum.questionnaire = questionnare;
    }
    forum.absorbFromDto(createForumDto);
    return await this.forumRepo.save(forum);
  }

  async findOne(searchForumDto: SearchForumDto) {
    return await this.forumRepo.findOneBy(searchForumDto);
  }

  async checkifForumExist(searchForumDto: SearchForumDto) {
    const forum = await this.forumRepo
      .createQueryBuilder('forum')
      .where('forum.title = : title', { title: searchForumDto.title })
      .orWhere('forum.description = :description', {
        description: searchForumDto.description,
      })
      .getOne();
    if (!forum) {
      return false;
    }
    return true;
  }

  async listForums(listParamsDto: ListParamsDto) {
    const array = await this.forumRepo
      .createQueryBuilder('forum')
      .leftJoinAndSelect('forum.images', 'images')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(`forum.${listParamsDto.getOrderedField()}`, listParamsDto.order)
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();
    return new ListDto(array, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async deleteForumById(forum_id: number) {
    const forum = await this.forumRepo.findOneBy({ id: forum_id });
    if (forum) {
      forum.isDeleted = true;
      await this.forumRepo.save(forum);
      return `Forum is successfully removed!`;
    }
    return `Forum is not found!`;
  }

  async applyUserToForum(applyUserToForumDto: ApplyUserToForumDto) {
    const { userId, forumId } = applyUserToForumDto;
    const user = await this.userService.get(userId);
    const forum = await this.get(forumId);
    if (!forum) {
      throw new BadRequestException(`Forum with ${forumId} is not found!`);
    }
    const isUserApplied = await this.findAppliedUserById(forumId, userId);
    if (isUserApplied) {
      throw new BadRequestException(
        `User with id ${userId} already applied to this forum!`,
      );
    }

    const apply = new UserToForum();
    apply.user = user;
    apply.forum = forum;
    return await this.userToForumRepository.save(apply);
  }

  async findAppliedUserById(forumId: number, userId: number) {
    const appliedUser = await this.userToForumRepository.findOne({
      where: {
        forum: { id: forumId },
        user: { id: userId },
      },
    });

    return appliedUser;
  }

  async getAppliedUsers(forumId: number): Promise<UserToForum[]> {
    const forum: Forum = await this.forumRepo.findOne({
      where: {
        id: forumId,
      },
      relations: ['userToForum', 'userToForum.user', 'userToForum.user.image'],
    });

    if (!forum) {
      throw new BadRequestException(`Forum with id ${forumId} is not found!`);
    }
    return forum.userToForum;
  }

  async updateUserApplication(
    updateUserApplication: UpdateUserApplicationDto,
  ): Promise<UserToForum> {
    const { applicationId, applyStatus } = updateUserApplication;
    const application = await this.userToForumRepository.findOneBy({
      id: applicationId,
    });

    if (!application) {
      throw new BadRequestException(
        `Application to forum with id ${applicationId} is not found!`,
      );
    }

    application.applyStatus = applyStatus;
    return this.userToForumRepository.save(application);
  }

  async listFutureForums(listParamsDto: ListParamsDto) {
    const future = await this.repository
      .createQueryBuilder('forum')
      .where('forum.eventDate > :currentDate', { currentDate: new Date() })
      .leftJoinAndSelect('forum.images', 'images')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(`forum.${listParamsDto.getOrderedField()}`, listParamsDto.order)
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();
    return new ListDto(future, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async listPastForums(listParamsDto: ListParamsDto) {
    const past = await this.repository
      .createQueryBuilder('forum')
      .where('forum.eventDate < :currentDate', { currentDate: new Date() })
      .leftJoinAndSelect('forum.images', 'images')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(`forum.${listParamsDto.getOrderedField()}`, listParamsDto.order)
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();
    return new ListDto(past, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async getForumById(forum_id: number) {
    const forum = await this.forumRepo.findOne({
      where: { id: forum_id },
      relations: [
        'images',
        'userToForum',
        'userToForum.user.response.questionAnswers',
        'userToForum.user.response.questionnaire',
        'questionnaire',
        'questionnaire.questions',
        'questionnaire.questions.variants',
      ],
    });
    forum.userToForum.forEach((userToForum) => {
      const responses = userToForum.user.response;
      userToForum.user.response = responses.filter(
        (response) => response?.questionnaire?.id === forum?.questionnaire?.id,
      );
    });
    return forum;
  }
}
