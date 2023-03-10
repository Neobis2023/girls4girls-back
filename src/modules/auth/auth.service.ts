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
import { LoginDto } from './dto/login.dto';
import { SmsNikitaService } from '../../services/sms-nikita/sms-nikita.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmCode } from './entities/confirm-code.entity';
import { Repository } from 'typeorm';
import { ConfirmAccountDto } from './dto/confirm-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly smsNikitaService: SmsNikitaService,
    @InjectRepository(ConfirmCode)
    private readonly confirmCodesRepository: Repository<ConfirmCode>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    let user;
    if (loginDto.email) {
      user = await this.usersService.findOne({ email: loginDto.email });
    } else if (loginDto.phoneNumber) {
      user = await this.usersService.findOne({
        phoneNumber: loginDto.phoneNumber,
      });
    } else {
      throw new BadRequestException('Not proper credentials');
    }

    if (user && Hash.compare(loginDto.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    const isUserExists = await this.usersService.checkIfUserExists(
      createUserDto,
    );

    if (isUserExists) {
      throw new BadRequestException('User already exists');
    }

    const codeToConfirm = Math.random().toString().substr(2, 6);

    await this.saveConfirmCode(createUserDto, codeToConfirm);

    const smsResponse = await this.smsNikitaService.sendSms(
      createUserDto.phoneNumber,
      codeToConfirm,
    );

    const newUser = await this.usersService.create(createUserDto);

    const emailResponse = await this.sendEmailConfirmation(
      newUser,
      codeToConfirm,
    );
    return newUser;
  }

  async saveConfirmCode(createUserDto: CreateUserDto, code: string) {
    const existingCode = await this.confirmCodesRepository.findOneBy({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (existingCode) {
      await this.confirmCodesRepository.remove(existingCode);
      console.log('deleted existing code');
    }

    const newCode = new ConfirmCode();
    newCode.phoneNumber = createUserDto.phoneNumber;
    newCode.code = code;
    if (createUserDto.email) {
      newCode.email = createUserDto.email;
    }
    return this.confirmCodesRepository.save(newCode);
  }

  async confirm(confirmAccountDto: ConfirmAccountDto) {
    const { code, phoneNumber } = confirmAccountDto;
    const sentAccount = await this.confirmCodesRepository.findOne({
      where: {
        phoneNumber: confirmAccountDto.phoneNumber,
      },
    });
    if (!sentAccount || phoneNumber !== sentAccount.phoneNumber) {
      throw new BadRequestException('Incorrect credentials');
    }

    const currentTime = new Date().getTime();
    const createdAt = sentAccount.createdAt.getTime();
    const timeDifference = (currentTime - createdAt) / 1000 / 60;
    const tenMinutes = 10;
    if (timeDifference > tenMinutes) {
      this.confirmCodesRepository.remove(sentAccount);
      throw new BadRequestException('Code time is expired');
    }

    if (phoneNumber === sentAccount.phoneNumber && code === sentAccount.code) {
      const account = await this.usersService.findOne({ phoneNumber });
      this.confirmCodesRepository.remove(sentAccount);
      return this.usersService.activateUser(account.id);
    }

    return { message: 'Incorrect code' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new UnauthorizedException();
    }

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

  async sendEmailConfirmation(user: User, code) {
    const response = await this.mailService.sendMail(
      user.email,
      user.firstName,
      code,
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
