import { Injectable } from '@nestjs/common';
import { Patient } from './entities/Patient';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(private readonly repository: PatientRepository) {}

  async list(): Promise<Array<Patient>> {
    return this.repository.getAll();
  }
}
