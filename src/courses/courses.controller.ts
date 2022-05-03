import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Course } from '../models/course';
import { CoursesRepositry } from './courses.repositry';
import { NotFoundException } from '@nestjs/common';
import { AuthentificatnGuard } from '../guard/authentification.guard';
import { AdminGuard } from '../guard/admin.guard';

@Controller('courses')
@UseGuards(AuthentificatnGuard)
export class CoursesController {
  constructor(private courseDB: CoursesRepositry) {}

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return await this.courseDB.findAll();
  }

  @Get(':courseUrl')
  async findCourseByUrl(@Param('courseUrl') url: string): Promise<Course> {
    console.log(url);
    const find = await this.courseDB.findByUrl(url);

    if (!find) throw new NotFoundException('コースが見つかりません');

    return find;
  }

  @Post()
  @UseGuards(AdminGuard)
  async createCourse(@Body() course: Course): Promise<Course> {
    console.log(course);
    return this.courseDB.addCourse(course);
  }

  @Put(':courseId')
  @UseGuards(AdminGuard)
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Course,
  ): Promise<Course> {
    if (changes._id) throw new HttpException("Can't Update", 400);

    return await this.courseDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  @UseGuards(AdminGuard)
  async deleteCourse(@Param('courseId') courseId: string) {
    return await this.courseDB.deleteCourse(courseId);
  }
}
