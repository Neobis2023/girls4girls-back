import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { Hash } from '../../utils/hash.util';
import { BaseService } from '../../base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findOne({ email: createUserDto.email });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = Hash.make(createUserDto.password);
    const user = new User();
    user.absorbFromDto(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(searchUserDto: SearchUserDto) {
    return await this.usersRepository.findOneBy(searchUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
