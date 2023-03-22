import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { EditBlogDto } from './dto/edit-blog.dto';
import { VideoBlog } from './entities/video-blog.entity';

@Injectable()
export class VideoBlogService extends BaseService<VideoBlog> {
  constructor(
    @InjectRepository(VideoBlog)
    private readonly blogRepo: Repository<VideoBlog>,
  ) {
    super(blogRepo);
  }

  async createOne(blog: CreateBlogDto) {
    return await this.blogRepo.save(blog);
  }

  async editOne(id: number, newBlog: EditBlogDto) {
    const blog = await this.blogRepo.findOne({ where: { id: id } });
    if (!blog)
      throw new BadRequestException(
        'Видео с таким id отсутствует в Базе данных',
      );

    Object.assign(blog, newBlog);
    return await this.blogRepo.save(blog);
  }

  async deleteOne(blogId: number) {
    const blog = await this.get(blogId);
    if (blog) return await this.blogRepo.remove(blog);
    return;
  }
}
