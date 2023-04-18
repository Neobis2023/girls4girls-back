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
import { CreateCardInfoDto } from './dto/create-card-info.dto';

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
        cardInfoId: {
          type: 'number',
          example: 3,
          description: 'ID карточки с детальной информацией',
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

  @Post('card-info')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Имя человека на карточке',
          description: 'Название достижения',
        },
        info: {
          type: 'string',
          example: 'Информация о человеке на карточке',
          description: 'Описание достижения',
        },
        infoKG: {
          type: 'string',
          example: 'Карточкадагы адам жонундо маалымат',
          description: 'Жетишкендиктин суроттомосу',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Создание карточки для жетона' })
  async createCardInfo(
    @Body() createCardInfoDto: CreateCardInfoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.jetonService.createCardInfo(createCardInfoDto, file);
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
