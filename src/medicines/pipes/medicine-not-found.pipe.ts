import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { MedicinesRepository } from '../medicines.repository';

@Injectable()
export class MedicineNotFoundPipe implements PipeTransform {
  constructor(private readonly repository: MedicinesRepository) {}

  // eslint-disable-next-line
  async transform(id: string, metadata: ArgumentMetadata) {
    const medicineFound = await this.repository.findById(id);

    if (!medicineFound) throw new NotFoundException();

    return id;
  }
}
