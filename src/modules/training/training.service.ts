import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateTrainingDto } from './dto';
import { SearchTrainingDto } from './dto';
import { Training } from './entities';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import { ListDto } from '../../base/dto/list.dto';
import { UserToTraining } from './entities/users-to-training.entity';
import { UserService } from '../user/user.service';
import { ApplyUserToTrainingDto } from './dto/apply-user-to-training.dto';
import { UpdateUserApplicationDto } from './dto/update-user-application.dto';
import { Questionnaire } from '../questionnaire/entities/questionnaire.entity';
import { LecturerService } from '../lecturers/lecturers.service';

@Injectable()
export class TrainingsService extends BaseService<Training> {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepo: Repository<Training>,
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    @InjectRepository(UserToTraining)
    private readonly userToTrainingRepository: Repository<UserToTraining>,
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    private readonly imageService: ImageService,
    private readonly userService: UserService,
    private readonly lecturerService: LecturerService,
  ) {
    super(trainingRepo);
  }

  async createNewTraining(
    createTrainingDto: CreateTrainingDto,
    file: Express.Multer.File,
  ) {
    const training = new Training();
    if (file) {
      const images: Image[] = [];
      const image = await this.imageService.createImage(file);
      images.push(image);
      createTrainingDto.images = images;
    }

    if (createTrainingDto.questionnaireId) {
      const questionnaire = await this.questionnaireRepository.findOneBy({
        id: createTrainingDto.questionnaireId,
      });
      training.questionnaire = questionnaire;
    }

    if (createTrainingDto.lecturers) {
      try {
        const lecturersArr = JSON.parse(createTrainingDto.lecturers);
        if (Array.isArray(lecturersArr)) {
          const lecturers = [];
          for await (const id of lecturersArr) {
            const lecturer = await this.lecturerService.get(id);
            if (!lecturer) continue;
            lecturers.push(lecturer);
          }
          training.lecturers = lecturers;
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    delete createTrainingDto.lecturers;

    training.absorbFromDto(createTrainingDto);
    return await this.trainingRepo.save(training);
  }

  async listTrainings(listParamsDto: ListParamsDto) {
    const array = await this.trainingRepo
      .createQueryBuilder('training')
      .leftJoinAndSelect('training.images', 'images')
      .where('training.isDeleted != true')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(
        `training.${listParamsDto.getOrderedField()}`,
        listParamsDto.order,
      )
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

  async getTrainingById(id: number) {
    const training = await this.trainingRepo.findOne({
      where: {
        id,
      },
      relations: [
        'images',
        'userToTraining',
        'questionnaire',
        'questionnaire.questions',
        'questionnaire.questions.variants',
        'lecturers.image',
      ],
    });

    // training.userToTraining.forEach((userToTraining) => {
    //   const responses = userToTraining.user.response;
    //   userToTraining.user.response = responses.filter(
    //     (response) =>
    //       response?.questionnaire?.id === training?.questionnaire?.id,
    //   );
    // });
    return training;
  }

  async findOne(searchTrainingDto: SearchTrainingDto) {
    return await this.trainingRepo.findOneBy(searchTrainingDto);
  }

  async checkIfTrainingExist(searchTrainingDto: SearchTrainingDto) {
    const training = await this.trainingRepo
      .createQueryBuilder('training')
      .where('training.title = : title', { title: searchTrainingDto.title })
      .orWhere('training.description = :description', {
        description: searchTrainingDto.description,
      })
      .getOne();
    if (!training) {
      return false;
    }
    return true;
  }

  async deleteTraining(training_id: number) {
    const training = await this.trainingRepo.findOneBy({ id: training_id });
    if (training) {
      training.isDeleted = true;
      await this.trainingRepo.save(training);
      return `Training is successfully removed! `;
    }
    return `Training is not found!`;
  }

  async applyUserToTraining(applyUserToTrainingDto: ApplyUserToTrainingDto) {
    const { userId, trainingId } = applyUserToTrainingDto;
    const user = await this.userService.get(userId);
    const training = await this.get(trainingId);
    if (!training) {
      throw new BadRequestException(
        `Training with ${trainingId} is not found!`,
      );
    }

    const isUserApplied = await this.findAppliedUserById(trainingId, userId);
    if (isUserApplied) {
      throw new BadRequestException(
        `User with id ${userId} already applied to this training!`,
      );
    }

    const apply = new UserToTraining();
    apply.user = user;
    apply.training = training;
    return await this.userToTrainingRepository.save(apply);
  }

  async getAppliedUsers(trainingId: number): Promise<UserToTraining[]> {
    const training: Training = await this.trainingRepo.findOne({
      where: {
        id: trainingId,
      },
      relations: [
        'userToTraining',
        'userToTraining.user',
        'userToTraining.user.response.questionAnswers.question',
        'userToTraining.user.response.questionnaire',
        'userToTraining.user.image',
        'questionnaire',
        'questionnaire.questions',
        'questionnaire.questions.variants',
      ],
    });

    if (!training) {
      throw new BadRequestException(
        `Training with id ${trainingId} is not found!`,
      );
    }

    training.userToTraining.forEach((userToTraining) => {
      const responses = userToTraining.user.response;
      userToTraining.user.response = responses.filter(
        (response) =>
          response?.questionnaire?.id === training?.questionnaire?.id,
      );
    });

    return training.userToTraining;
  }

  async updateUserApplication(
    updateUserApplication: UpdateUserApplicationDto,
  ): Promise<UserToTraining> {
    const { applicationId, applyStatus } = updateUserApplication;
    const application = await this.userToTrainingRepository.findOneBy({
      id: applicationId,
    });

    if (!application) {
      throw new BadRequestException(
        `Application to training with id ${applicationId} is not found!`,
      );
    }

    application.applyStatus = applyStatus;
    return this.userToTrainingRepository.save(application);
  }

  async findAppliedUserById(trainingId: number, userId: number) {
    const appliedUser = await this.userToTrainingRepository.findOne({
      where: {
        training: { id: trainingId },
        user: { id: userId },
      },
    });

    return appliedUser;
  }

  async listPastTrainings(listParamsDto: ListParamsDto) {
    const pastTrainings = await this.repository
      .createQueryBuilder('training')
      .where('training.eventDate < :currentDate', { currentDate: new Date() })
      .andWhere('training.isDeleted != true')
      .leftJoinAndSelect('training.images', 'images')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(
        `training.${listParamsDto.getOrderedField()}`,
        listParamsDto.order,
      )
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();

    return new ListDto(pastTrainings, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async listFutureTrainings(listParamsDto: ListParamsDto) {
    const futureTrainings = await this.repository
      .createQueryBuilder('training')
      .where('training.eventDate > :currentDate', { currentDate: new Date() })
      .andWhere('training.isDeleted != true')
      .leftJoinAndSelect('training.images', 'images')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(
        `training.${listParamsDto.getOrderedField()}`,
        listParamsDto.order,
      )
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();

    return new ListDto(futureTrainings, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }
}
