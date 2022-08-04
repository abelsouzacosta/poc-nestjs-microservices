import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MedicinesRepository } from '../../medicines.repository';

@Injectable()
export class MedicineNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: MedicinesRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const medicineFound = await this.repository.findById(id);

    if (!medicineFound)
      throw new HttpException(
        `Mecicine not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );

    next();
  }
}
