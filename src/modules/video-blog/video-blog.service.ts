import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/category.entity';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { EditBlogDto } from './dto/edit-blog.dto';
import { VideoBlog } from './entities/video-blog.entity';

@Injectable()
export class VideoBlogService extends BaseService<VideoBlog> {
  constructor(
    @InjectRepository(VideoBlog)
    private readonly blogRepo: Repository<VideoBlog>,
    private readonly imageService: ImageService,
  ) {
    super(blogRepo);
  }

  async createOne(blog: CreateBlogDto) {
    const images = [];
    const image = await this.imageService.createImage(blog.lecturerImage);
    console.log(image);
    images.push(image);
    const videoBlog = new VideoBlog();
    Object.assign(videoBlog, blog);
    videoBlog.lecturerImage = images;
    console.log(videoBlog);
    return await this.blogRepo.save(videoBlog);
  }

  //ещё не готово
  // async editOne(id: number, newBlog: EditBlogDto) {
  //   const blog = await this.blogRepo.findOne({ where: { id: id } });
  //   if (!blog)
  //     throw new BadRequestException(
  //       'Видео с таким id отсутствует в Базе данных',
  //     );

  //   Object.assign(blog, newBlog);
  //   return await this.blogRepo.save(blog);
  // }

  async deleteOne(blogId: number) {
    const blog = await this.get(blogId);
    if (blog) return await this.blogRepo.remove(blog);
    return;
  }
}
