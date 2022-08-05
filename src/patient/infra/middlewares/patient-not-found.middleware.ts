import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PatientRepository } from 'src/patient/patient.repository';
import { PatientNotFoundException } from '../exceptions/patient-not-found.exception';

@Injectable()
export class PatientNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly repository: PatientRepository) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const foundPatient = await this.repository.findById(id);

    if (!foundPatient) throw new PatientNotFoundException(id);

    next();
  }
}
