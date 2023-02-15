import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { Hash } from '../../utils/hash.util';
import { BaseService } from '../../base/base.service';
import { StatusEnum } from './enums/user-status.enum';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findOne({ email: createUserDto.email });
    if (userExists && userExists.status === StatusEnum.ACTIVE) {
      throw new BadRequestException('User already exists');
    }
    if (userExists && userExists.status === StatusEnum.PENDING) {
      await this.usersRepository.remove(userExists);
    }

    createUserDto.password = Hash.make(createUserDto.password);
    const user = new User();
    user.absorbFromDto(createUserDto);
    return this.usersRepository.save(user);
  }

  async activateUser(id: number) {
    const user: User = await this.get(id);
    if (user && user.status === StatusEnum.PENDING) {
      user.status = StatusEnum.ACTIVE;
      return this.usersRepository.save(user);
    }
    throw new BadRequestException('Confirmation error');
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
    } else if (user.status === StatusEnum.PENDING) {
      await this.usersRepository.remove(user);
      return false;
    }

    return true;
  }
}
