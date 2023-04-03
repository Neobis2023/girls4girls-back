import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Категории')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Получить все категории' })
  @Get()
  async getAllCategories(@Query() listParamsDto: ListParamsDto) {
    return await this.categoryService.list(listParamsDto);
  }

  @ApiOperation({ summary: 'Получить все видео-блоги определенной категории' })
  @Get(':name')
  async getCategoryBlog(@Param('name') name: string) {
    return await this.categoryService.getCategoryBlogs(name);
  }

  @ApiOperation({ summary: 'Создать категорию' })
  @Post('')
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoryService.createOne(category);
  }

  @ApiOperation({ summary: 'Удалить категорию по id' })
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteOne(id);
  }
}
