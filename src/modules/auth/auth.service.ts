import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Hash } from '../../utils/hash.util';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && Hash.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const body = `<?xml version="1.0" encoding="UTF-8"?>
                   <message>
                    <login>begalievn</login>
                    <pwd>Jda2XvVp</pwd>
                    <id>${Math.random().toString().substr(2, 6)}</id>
                    <sender>SMSPRO.KG</sender>
                    <text>Код для подтверждения 1122</text>
                    <time></time>
                    <phones>
                      <phone>${createUserDto.phoneNumber}</phone>
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

    console.log(response);

    const newUser = await this.usersService.create(createUserDto);
    const emailResponse = await this.sendEmailConfirmation(newUser);
    return newUser;
  }

  async confirm(token: string) {
    const decoded = await this.verifyToken(token);
    return this.usersService.activateUser(decoded.id);
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendEmailConfirmation(user: User) {
    const expiresIn = 60 * 60 * 24;
    const tokenPayload = {
      id: user.id,
      status: user.status,
      role: user.role,
    };

    const token = await this.generateToken(tokenPayload, { expiresIn });
    const confirmLink = `${this.configService.get(
      'BASE_URL',
    )}/auth/confirm?token=${token}`;

    const response = await this.mailService.sendMail(
      user.email,
      confirmLink,
      user.firstName,
    );
    return response;
  }

  private async generateToken(data, options?: SignOptions) {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token) {
    try {
      const data = this.jwtService.verify(token);
      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
