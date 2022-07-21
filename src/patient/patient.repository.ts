import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientRepositoryDto } from './dtos/CreatePatientRepository.dto';
import { Patient } from './entities/Patient';

export class PatientRepository {
  constructor(
    @InjectModel(Patient.name) private readonly model: Model<Patient>,
  ) {}

  async getAll(): Promise<Array<Patient>> {
    return this.model.find();
  }

  async createPatient({
    name,
    ssn,
    email,
    date_birth,
    height,
    weight,
    blood_type,
    addresses,
    phones,
  }: CreatePatientRepositoryDto): Promise<Patient> {
    return this.model.create({
      name,
      ssn,
      email,
      date_birth,
      height,
      weight,
      blood_type,
      addresses,
      phones,
    });
  }
}
