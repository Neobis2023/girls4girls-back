import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateCharacterImageDto } from './dto/create-character-image.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AddCharacterToUserDto } from './dto/add-character-to-user.dto';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import * as Path from 'path';

@ApiTags('Персонаж')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка персонажей' })
  listCharacterImages(@Query() listParamsDto: ListParamsDto) {
    return this.characterService.getCharacterImages();
  }

  @Delete('character-image/:id')
  softDeleteCharacterImage(@Param('id') id: number) {
    return this.characterService.softDeleteCharacterImage(id);
  }

  @Post('add-character')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление персонажа пользователю' })
  addCharacterToUser(
    @Req() req: any,
    @Body() addCharacterToUser: AddCharacterToUserDto,
  ) {
    return this.characterService.addCharacterToUser(
      addCharacterToUser,
      req.user?.id,
    );
  }

  @Post('create-image')
  @ApiOperation({ summary: 'Создание картинки персонажа' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        title: {
          type: 'string',
          example: 'Blue',
          description: 'Название картинки персонажа',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images'))
  createCharacterImage(
    @Body() createCharacterImageDto: CreateCharacterImageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.characterService.createCharacterImage(
      createCharacterImageDto,
      files,
    );
  }
}
