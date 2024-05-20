import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TransformToPlainObjectPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    return classToPlain(value);
  }
}
