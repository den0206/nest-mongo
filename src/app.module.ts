import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { LessonsController } from './lessons/lessons.controller';
import { AuthModule } from './auth/auth.module';
import { GetUserMiddleWare } from './middleware/get-user.middleware';
import { CoursesController } from './courses/courses.controller';
require('dotenv').config();

@Module({
  imports: [CoursesModule, MongooseModule.forRoot(getMongoUrl()), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserMiddleWare)
      .forRoutes(CoursesController, LessonsController);
  }
}

function getMongoUrl(): string {
  const name = process.env.DB_USER_NAME;
  const dbName = process.env.DB_NAME;
  const password = process.env.DB_PASS;
  console.log(name);
  return `mongodb+srv://${name}:${password}@cluster0.wybhe.mongodb.net/${dbName}?retryWrites=true&w=majority`;
}
