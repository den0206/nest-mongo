import { LessonRepositry } from './lesson.repositry';
import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonDB: LessonRepositry) {}

  @Get()
  async searchLesson(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder: string = 'asc',
    @Query('pageNumber', ParseIntPipe) pageNumber: number = 0,
    @Query('pageSize', ParseIntPipe) pageSize: number = 3,
  ) {
    if (!courseId) throw new BadRequestException('ID　が必要です');
    if (sortOrder != 'asc' && sortOrder != 'desc')
      throw new BadRequestException('ソートが正しくありません');

    return await this.lessonDB.search(
      courseId,
      sortOrder,
      pageNumber,
      pageSize,
    );
  }
}
