import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MedicinesRepository } from '../../medicines.repository';
import { MedicineNotFoundException } from '../exceptions/medicine-not-found.exception';

@Injectable()
export class MedicineNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: MedicinesRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const medicineFound = await this.repository.findById(id);

    if (!medicineFound) throw new MedicineNotFoundException(id);

    next();
  }
}
