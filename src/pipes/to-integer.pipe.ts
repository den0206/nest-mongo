import {
  ArgumentMetadata,
  BadGatewayException,
  PipeTransform,
} from '@nestjs/common';

export class ToIntegerPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value);

    if (isNaN(val)) {
      throw new BadGatewayException('数値に変換できません' + value);
    }

    return val;
  }
}
