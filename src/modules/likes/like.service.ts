import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Likes } from './entities/like.entity';
import { User } from '../user/entities/user.entity';
import { VideoBlog } from '../video-blog/entities/video-blog.entity';
import { ToggleLikeDto } from './dto/toggle-like.dto';
import { UserService } from '../user/user.service';
import { VideoBlogService } from '../video-blog/video-blog.service';

@Injectable()
export class LikeService extends BaseService<Likes> {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepo: Repository<Likes>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(VideoBlog)
    private readonly videoBlogRepo: Repository<VideoBlog>,
    private readonly userService: UserService,
    private readonly videoBlogService: VideoBlogService,
  ) {
    super(likesRepo);
  }

  async like(blogId: number, reqUser: any) {
    const liked = await this.likesRepo.findOne({
      where: {
        blog: { id: blogId },
        user: { id: reqUser.id },
      },
    });
    if (liked) return;
    const user = await this.userRepo.findOne({
      where: { id: reqUser.id },
    });
    const blog = await this.videoBlogRepo.findOne({
      where: { id: blogId },
    });
    if (!blog) {
      throw new BadRequestException('Блог не найден');
    }
    const newLike = new Likes();
    newLike.user = user;
    newLike.blog = blog;
    return await this.likesRepo.save(newLike);
  }

  async dislike(blogId: number, reqUser: any) {
    const liked = await this.likesRepo.findOne({
      where: {
        blog: { id: blogId },
        user: { id: reqUser.id },
      },
      relations: ['blog', 'blog.category'],
    });
    if (liked) return await this.likesRepo.remove(liked);
    return;
  }

  async getLikes(reqUser: any) {
    return await this.likesRepo.find({
      where: { user: { id: reqUser.id } },
      relations: ['blog', 'blog.category'],
    });
  }

  async toggleLike(userId: number, toggleLikeDto: ToggleLikeDto) {
    const { blogId } = toggleLikeDto;
    const like = await this.likesRepo.findOne({
      where: {
        blog: { id: blogId },
        user: { id: userId },
      },
    });

    if (like) {
      return this.likesRepo.remove(like);
    }

    const user = await this.userService.get(userId);
    const videoBlog = await this.videoBlogService.get(blogId);
    if (!videoBlog) {
      throw new BadRequestException(`Видео-блог по ID ${blogId} не найден!`);
    }
    const newLike = new Likes();
    newLike.blog = videoBlog;
    newLike.user = user;
    return this.likesRepo.save(newLike);
  }
}
