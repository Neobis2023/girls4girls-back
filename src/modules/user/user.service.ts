import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { Hash } from '../../utils/hash.util';
import { BaseService } from '../../base/base.service';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ImageService } from '../image/image.service';
import { RegionEnum } from '../../utils/enum/region.enum';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { StatusEnum } from './enums/user-status.enum';
import { ListDto } from 'src/base/dto/list.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly imageService: ImageService,
  ) {
    super(usersRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findOne({ email: createUserDto.email });
    if (userExists && userExists.confirmed) {
      throw new BadRequestException('User already exists');
    }
    if (userExists && !userExists.confirmed) {
      await this.usersRepository.remove(userExists);
    }

    createUserDto.password = Hash.make(createUserDto.password);
    const user = new User();
    user.absorbFromDto(createUserDto);
    return this.usersRepository.save(user);
  }

  async activateUser(id: number) {
    const user: User = await this.get(id);
    if (user && !user.confirmed) {
      user.confirmed = true;
      return this.usersRepository.save(user);
    }
    throw new BadRequestException('Confirmation error');
  }

  async getProfile(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['jetons', 'image', 'character.characterImage.images'],
    });

    if (!user || !id) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findOne(searchUserDto: SearchUserDto) {
    return await this.usersRepository.findOneBy(searchUserDto);
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .where(
        'LOWER(user.firstName) ILIKE LOWER(:searchTerm) OR LOWER(user.lastName) ILIKE LOWER(:searchTerm) OR LOWER(user.email) ILIKE LOWER(:searchTerm)',
        { searchTerm: `${searchTerm}%` },
      )
      .leftJoinAndSelect('user.image', 'image');

    const users = await query.getMany();
    return users;
  }

  async checkIfUserExists(searchUserDto: SearchUserDto) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: searchUserDto.email })
      .orWhere('user.phoneNumber = :phoneNumber', {
        phoneNumber: searchUserDto.phoneNumber,
      })
      .getOne();

    if (!user) {
      return false;
    } else if (!user.confirmed) {
      await this.usersRepository.remove(user);
      return false;
    }

    return true;
  }

  async addProfileImage(userId: number, file: Express.Multer.File) {
    const user = await this.getWithRelations(userId, 'user', ['image']);

    if (!file) {
      throw new BadRequestException('Image is not provided!');
    }

    const image = await this.imageService.createImage(file);
    user.image = image;
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.get(id);
    if (user) {
      return this.usersRepository.remove(user);
    }
    return { message: `User with id ${id} nod found!` };
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    user.password = Hash.make(changePasswordDto.newPassword);
    return this.usersRepository.save(user);
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const { email, phoneNumber } = updateProfileDto;

    const user = await this.get(id);

    if (email) {
      const isEmailExists = await this.findOne({ email });
      if (isEmailExists) {
        throw new BadRequestException(`Email ${email} is used by other user!`);
      }
    }

    if (phoneNumber) {
      const isPhoneNumberExists = await this.findOne({ phoneNumber });
      if (isPhoneNumberExists) {
        throw new BadRequestException(
          `Phone number ${phoneNumber} is used by other user!`,
        );
      }
    }

    user.absorbFromDto(updateProfileDto);

    return this.usersRepository.save(user);
  }

  async getRegions() {
    return RegionEnum;
  }

  async getUsersByFullname(firstName: string, lastName: string) {
    return await this.repository
      .createQueryBuilder('user')
      .where(
        'user.firstName LIKE :firstName AND user.lastName LIKE :lastName',
        {
          firstName: `%${firstName}%`,
          lastName: `%${lastName}%`,
        },
      )
      .leftJoinAndSelect('user.image', 'image')
      .getMany();
  }

  async getUsersStatuses() {
    return StatusEnum;
  }

  async listByStatus(listParamsDto: ListParamsDto, status: StatusEnum) {
    const array = await this.repository
      .createQueryBuilder('user')
      .where('user.status = :status', { status })
      .leftJoinAndSelect('user.image', 'image')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(`user.${listParamsDto.getOrderedField()}`, listParamsDto.order)
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

  async justSaveUser(user: User) {
    return this.usersRepository.save(user);
  }
}
