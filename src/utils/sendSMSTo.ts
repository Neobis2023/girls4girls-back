import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export function sendSMSTo(receiver, content): void {
  const data = `<?xml version="1.0" encoding="UTF-8"?>
    <message>
        <login>Garnizon1</login>
        <pwd>uo_bWwZD</pwd>
        <id>${uuidv4()}</id>
        <sender>G-SOS KG</sender>
        <text>${content}</text>
        <phones>
            <phone>${receiver}</phone>
        </phones>
    </message>`;

  const config = {
    method: 'post',
    url: 'https://smspro.nikita.kg/api/message ',
    headers: {
      'Content-Type': 'application/xml',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
