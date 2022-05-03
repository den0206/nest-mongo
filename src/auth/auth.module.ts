import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
const userScherma = require('../schema/user.schema');

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userScherma }])],
  controllers: [AuthController],
})
export class AuthModule {}
