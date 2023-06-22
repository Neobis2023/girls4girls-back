import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Картинки')
@Controller('image')
export class ImageController {
  constructor(private readonly imagesService: ImageService) {}

  @Post()
  @ApiOperation({ summary: 'Для отправки изображений' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  createImage(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.createImage(file);
  }
}
