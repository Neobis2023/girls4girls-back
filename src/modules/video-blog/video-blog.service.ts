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
    @InjectRepository(Categories)
    private readonly categoryRepo: Repository<Categories>,
    private readonly imageService: ImageService,
  ) {
    super(blogRepo);
  }

  async getWithRelations(id: number) {
    return await this.blogRepo.findOne({
      where: { id: id },
      relations: ['lecturerImage', 'category'],
    });
  }

  async createOne(blog: CreateBlogDto) {
    const categoryNames = blog.categoriesNames;
    const images = [];
    // const categories = await this.categoryRepo
    //   .createQueryBuilder('categories')
    //   .where('categor.name IN (:...categoryNames)', { categoryNames })
    //   .getMany();
    console.log(blog);
    // const image = await this.imageService.createImage(blog.lecturerImage);
    // console.log(image);
    // images.push(image);
    // const videoBlog = new VideoBlog();
    // Object.assign(videoBlog, blog);
    // videoBlog.lecturerImage = images;
    // videoBlog.category = categories;
    // console.log(videoBlog);
    // return await this.blogRepo.save(videoBlog);
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
