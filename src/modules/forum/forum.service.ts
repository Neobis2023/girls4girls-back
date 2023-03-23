import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { SearchForumDto } from './dto/search-forum.dto';
import { Forum } from './entities/forum.entity';

@Injectable()
export class ForumService extends BaseService<Forum> {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepo: Repository<Forum>,
    @InjectRepository(Image)
    private readonly imageRepo:Repository<Image>,
    private readonly imageService: ImageService,
  ) {
    super(forumRepo);
  }

  async getOneByTitle(title: string) {
    const findByTitle = await this.forumRepo.findOne({ where: { title } });
    if (!findByTitle) {
      throw new BadRequestException(` Forum with such title is not found!`);
    }
    return findByTitle;
  }

  async createNewForum(
    createForumDto: CreateForumDto,
    file: Express.Multer.File,
  ) {
    const images: Image[] = [];
    const image = await this.imageService.createImage(file);
    images.push(image);

    const forum = new Forum();
    forum.absorbFromDto(createForumDto);
    forum.image = images;
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

  async findOneById(id: number) {
    const forum = await this.get(id);
    if (!forum) {
      throw new BadRequestException('NOT FOUND!');
    }
    return forum;
  }

  async deleteForumById(forum_id: number) {
    const forum = await this.forumRepo.findOneBy({ id: forum_id });
    if (forum) {
      await this.forumRepo.delete({ id: forum?.id });
      return `Forum is successfully removed!`;
    }
    return `Forum is not found!`;
  }
}
