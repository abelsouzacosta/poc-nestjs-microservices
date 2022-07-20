import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './entities/Patient';

export class PatientRepository {
  constructor(
    @InjectModel(Patient.name) private readonly model: Model<Patient>,
  ) {}

  async getAll(): Promise<Array<Patient>> {
    return this.model.find();
  }
}
