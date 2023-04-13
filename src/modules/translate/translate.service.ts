import { Injectable } from '@nestjs/common';
import { TranslateDTO } from './dto/translate.dto';

const translate = require('@vitalets/google-translate-api');

@Injectable()
export class TranslateService {
  async translator(translateDTO: TranslateDTO) {
    const { from, to, query } = translateDTO;
    const translatedText = await translate(query, { from, to });
    return translatedText.text;
  }
}
