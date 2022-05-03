import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/models/lesson';

@Injectable()
export class LessonRepositry {
  constructor(@InjectModel('Lesson') private lessonModel: Model<Lesson>) {}

  async search(
    courseId: string,
    sortOfOrder: string,
    pageNumber: number,
    pageSize: number,
  ) {
    return await this.lessonModel.find(
      {
        course: courseId,
      },
      null,
      {
        skip: pageNumber * pageSize,
        limit: pageSize,
        sort: {
          seqNo: sortOfOrder,
        },
      },
    );
  }
}
