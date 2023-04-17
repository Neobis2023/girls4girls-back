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
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateJetonDto } from './dto/update-jeton.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JetonType } from './enums/jeton-type.enum';

@ApiTags('Жетоны')
@Controller('jeton')
export class JetonController {
  constructor(private readonly jetonService: JetonService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка жетонов' })
  async list(@Query() listParams: ListParamsDto) {
    return this.jetonService.listWithRelations(listParams, 'jeton', ['image']);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Название достижения',
          description: 'Название достижения',
        },
        titleKG: {
          type: 'string',
          example: 'Жетишкендиктин аты',
          description: 'Жетишкендиктин аты',
        },
        description: {
          type: 'string',
          example: 'Достижение за проявленную отвагу и смелость',
          description: 'Описание достижения',
        },
        descriptionKG: {
          type: 'string',
          example: 'Корсоткон эрдик учун жетишкендик',
          description: 'Жетишкендиктин суроттомосу',
        },
        type: {
          type: 'string',
          enum: [JetonType.CARD, JetonType.VIDEO, JetonType.TEST],
          description: 'Тип достижения',
        },
        quantityToGet: {
          type: 'number',
          example: '10',
          description: 'Количество активностей чтобы получить достижение',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Создание жетона' })
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
