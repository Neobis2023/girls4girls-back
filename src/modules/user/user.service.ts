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

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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
    console.log(id);
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['jetons'],
    });

    if (!user || !id) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findOne(searchUserDto: SearchUserDto) {
    return await this.usersRepository.findOneBy(searchUserDto);
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

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    return updateProfileDto;
  }
}
