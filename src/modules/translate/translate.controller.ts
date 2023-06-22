import { Body, Controller, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TranslateDTO } from './dto/translate.dto';

@ApiTags('Переводчик')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  @ApiOperation({ summary: 'Перевод текста' })
  translate(@Body() body: TranslateDTO) {
    return this.translateService.translator(body);
  }
}
