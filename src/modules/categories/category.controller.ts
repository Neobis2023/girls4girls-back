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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Видеоблоги')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(@Query() listParamsDto: ListParamsDto) {
    return await this.categoryService.list(listParamsDto);
  }

  @Post('')
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoryService.createOne(category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteOne(id);
  }
}
