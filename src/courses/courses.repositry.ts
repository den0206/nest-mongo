import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '../models/course';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesRepositry {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find();
  }

  async findByUrl(url: string): Promise<Course> {
    return await this.courseModel.findOne({ url: url });
  }

  async addCourse(course: Course): Promise<Course> {
    const newCourse = new this.courseModel(course);
    await newCourse.save();

    return newCourse.toObject({ versionKey: false });
  }

  async updateCourse(courseId: string, changes: Course): Promise<Course> {
    return await this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true,
    });
  }

  async deleteCourse(courseId: string) {
    const course = await this.courseModel.findById(courseId);
    if (!course) throw new NotFoundException();

    return await this.courseModel.deleteOne({ _id: courseId });
  }
}
