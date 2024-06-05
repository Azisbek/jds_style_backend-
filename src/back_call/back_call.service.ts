import { Injectable } from '@nestjs/common';
import { CreateBackCallDto } from './dto/create-back_call.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BackCall } from './schemas/back_call.schemas';
import { Model } from 'mongoose';
const nodemailer = require('nodemailer');

@Injectable()
export class BackCallService {
  constructor(
    @InjectModel(BackCall.name) private readonly backCallModel: Model<BackCall>,
  ) {}

  async create(createBackCallDto: CreateBackCallDto): Promise<BackCall> {
    const { number, userName } = createBackCallDto;
    const createdBackCall = new this.backCallModel(createBackCallDto);
    await createdBackCall.save();

    await this.sendEmailNotification(number, userName);

    return createdBackCall;
  }

  async sendEmailNotification(number: string, userName: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'Новый обратный звонок',
        text: `Новый обратный звонок от ${userName}. Номер телефона: ${number}`,
      };

      await transporter.sendMail(mailOptions);
      console.log('Уведомление отправлено успешно.');
    } catch (error) {
      console.error('Ошибка при отправке уведомления:', error);
    }
  }

  findAll() {
    return this.backCallModel.find();
  }

  deleteById(id: string) {
    return this.backCallModel.findByIdAndDelete(id);
  }
}
