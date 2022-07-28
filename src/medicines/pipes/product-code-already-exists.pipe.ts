import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { MedicinesRepository } from '../medicines.repository';

@Injectable()
export class ProductCodeAlreadyExistsPipe implements PipeTransform {
  constructor(
    @Inject(MedicinesRepository)
    private readonly repository: MedicinesRepository,
  ) {}

  async transform(
    { product_code }: CreateMedicineDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    const productCodeAlredyExists = await this.repository.findByProductCode(
      product_code,
    );

    if (productCodeAlredyExists)
      throw new HttpException(
        `product_code already exists`,
        HttpStatus.CONFLICT,
      );

    return product_code;
  }
}
