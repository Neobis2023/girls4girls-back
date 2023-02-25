import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsNikitaService {
  async sendSms(phoneNumber: string, code: string) {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
                   <message>
                    <login>arstanr</login>
                    <pwd>74v6h3Ok</pwd>
                    <id>${Math.random().toString().substr(2, 6)}</id>
                    <sender>SMSPRO.KG</sender>
                    <text>Код для подтверждения ${code}</text>
                    <time></time>
                    <phones>
                      <phone>${phoneNumber}</phone>
                    </phones>
                  </message>`;
    const response = await axios.post(
      'https://smspro.nikita.kg/api/message',
      body,
      {
        headers: {
          'Content-Type': 'text/xml',
        },
      },
    );

    return response;
  }
}
