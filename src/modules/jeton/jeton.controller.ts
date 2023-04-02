import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JetonService } from './jeton.service';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import { CreateJetonDto } from './dto/create-jeton.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateJetonDto } from './dto/update-jeton.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Жетоны')
@Controller('jeton')
export class JetonController {
  constructor(private readonly jetonService: JetonService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка жетонов' })
  async list(@Query() listParams: ListParamsDto) {
    return this.jetonService.list(listParams);
  }

  @Post()
  @ApiOperation({ summary: 'Создание жетона' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createJetonDto: CreateJetonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.jetonService.create(createJetonDto, file);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление жетона по id' })
  async update(
    @Param('id') id: number,
    @Body() updateJetonDto: UpdateJetonDto,
  ) {
    return this.jetonService.update(id, updateJetonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление жетона по id' })
  async delete(@Param('id') id: number) {
    return this.jetonService.delete(id);
  }
}
