import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/category.entity';
import { ImageService } from '../image/image.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { EditBlogDto } from './dto/edit-blog.dto';
import { VideoBlog } from './entities/video-blog.entity';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { AddToWatchedDto } from './dto/add-to-watched.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class VideoBlogService extends BaseService<VideoBlog> {
  constructor(
    @InjectRepository(VideoBlog)
    private readonly blogRepo: Repository<VideoBlog>,
    @InjectRepository(Categories)
    private readonly categoryRepo: Repository<Categories>,
    private readonly imageService: ImageService,
    private readonly userService: UserService,
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
    if (!category) {
      throw new BadRequestException(
        `Категория '${newBlog.category}' не найдена`,
      );
    }
    const newImage = await this.imageService.createImage(newBlog.lecturerImage);
    blog.category = category;
    blog.videoUrl = newBlog.videoUrl;
    blog.title = newBlog.title;
    blog.lecturerImage = newImage;
    blog.description = newBlog.description;
    blog.lecturerInfo = newBlog.lecturerInfo;
    blog.lecturerName = newBlog.lecturerName;
    return await this.blogRepo.save(blog);
  }

  async deleteOne(blogId: number) {
    const blog = await this.get(blogId);
    if (blog) return await this.blogRepo.remove(blog);
    return;
  }

  async addView(id: number) {
    const videoBlog = await this.get(id);
    videoBlog.postViewCount++;
    return await this.blogRepo.save(videoBlog);
  }

  async getWithRandomBlogs(id: number) {
    const videoBlog = await this.getWithRelations(id, 'videoBlog', [
      'category',
    ]);
    if (!videoBlog) {
      throw new BadRequestException('Категории с таким id нет в базе данных');
    }
    const blogs = await this.listWithRelations(
      new ListParamsDto(),
      'videoblog',
      ['category'],
    );
    const categoryName = videoBlog.category.name;
    const arr = blogs.data;
    const randomBlogs = await this.randomVideoBlogs(id, arr, categoryName);
    const data = { videoBlog: videoBlog, randomThreeVideoBlogs: randomBlogs };
    return data;
  }

  async randomVideoBlogs(id: number, arr, categoryName: string) {
    const index = arr.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    const objects = arr.filter((obj) => obj.category.name === categoryName);
    if (objects.length <= 3) {
      return objects;
    }
    for (let i = objects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [objects[i], objects[j]] = [objects[j], objects[i]];
    }
    return objects.slice(0, 3);
  }

  async addToWatched(userId: number, addToWatchedDto: AddToWatchedDto) {
    const { blogId } = addToWatchedDto;
    const user = await this.userService.getWithRelations(userId, 'user', [
      'videoBlogs',
    ]);
    const videoBlog = await this.get(blogId);

    if (!videoBlog) {
      throw new BadRequestException(`Видео блог с id ${blogId} не найден!`);
    }

    if (user.videoBlogs.find((blog) => blog.id === blogId)) {
      return user.videoBlogs;
    }

    user.videoBlogs.push(videoBlog);
    return this.userService.justSaveUser(user);
  }
}
