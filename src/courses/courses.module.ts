const coursesSchema = require('../schema/courses.schema');
const lessonSchema = require('../schema/lesson.schema');

import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesRepositry } from './courses.repositry';
import { LessonRepositry } from '../lessons/lesson.repositry';
import { LessonsController } from '../lessons/lessons.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: coursesSchema },
      { name: 'Lesson', schema: lessonSchema },
    ]),
  ],
  controllers: [CoursesController, LessonsController],
  providers: [CoursesRepositry, LessonRepositry],
})
export class CoursesModule {}
