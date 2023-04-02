import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/category.entity';
import { ImageService } from '../image/image.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { EditBlogDto } from './dto/edit-blog.dto';
import { VideoBlog } from './entities/video-blog.entity';
import { log } from 'console';

@Injectable()
export class VideoBlogService extends BaseService<VideoBlog> {
  constructor(
    @InjectRepository(VideoBlog)
    private readonly blogRepo: Repository<VideoBlog>,
    @InjectRepository(Categories)
    private readonly categoryRepo: Repository<Categories>,
    private readonly imageService: ImageService,
  ) {
    super(blogRepo);
  }

  async createOne(blog: CreateBlogDto) {
    const videoBlog = new VideoBlog();
    const category = await this.categoryRepo.findOne({
      where: { name: blog.category },
    });
    if (!category)
      throw new BadRequestException('Введите название категории правильно');
    const image = await this.imageService.createImage(blog.lecturerImage);
    Object.assign(videoBlog, blog);
    videoBlog.lecturerImage = image;
    videoBlog.category = category;
    console.log(videoBlog);
    return await this.blogRepo.save(videoBlog);
  }

  async editOne(id: number, newBlog: EditBlogDto) {
    const blog = await this.blogRepo.findOne({
      where: { id: id },
      relations: ['category', 'lecturerImage'],
    });
    if (!blog)
      throw new BadRequestException(
        'Видео с таким id отсутствует в Базе данных',
      );
    const category = await this.categoryRepo.findOne({
      where: { name: newBlog.category },
    });
    if (!category)
      throw new BadRequestException('Введите название категории правильно');
    const newImage = await this.imageService.createImage(newBlog.lecturerImage);
    blog.category = category;
    blog.videoUrl = newBlog.videoUrl;
    blog.title = newBlog.title;
    blog.lecturerImage = newImage;
    blog.description = newBlog.description;
    blog.lecturerInfo = newBlog.lecturerInfo;
    blog.lecturerName = newBlog.lecturerName;
    log(blog);
    return await this.blogRepo.save(blog);
  }

  async deleteOne(blogId: number) {
    const blog = await this.get(blogId);
    if (blog) return await this.blogRepo.remove(blog);
    return;
  }
}
