import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Not find User');
    }
    const payload = { id: user.id, email: user.email };

    const token = this.jwt.sign(payload);
  }
}
