import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientAddressRepositoryDto } from './dtos/CreatePatientAddressRepository.dto';
import { CreatePatientRepositoryDto } from './dtos/CreatePatientRepository.dto';
import { Patient } from './entities/Patient';

export class PatientRepository {
  constructor(
    @InjectModel(Patient.name) private readonly model: Model<Patient>,
  ) {}

  async getAll(): Promise<Array<Patient>> {
    return this.model.find();
  }

  async findById(id: string): Promise<Patient> {
    return this.model.findById(id);
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

  async addAddressToClient({
    id,
    country,
    state,
    city,
    district,
    street,
    number,
    zipcode,
  }: CreatePatientAddressRepositoryDto) {
    const newAddress = {
      country,
      state,
      city,
      district,
      street,
      number,
      zipcode,
    };

    return this.model.updateOne(
      {
        _id: id,
      },
      {
        $push: { addresses: newAddress },
      },
    );
  }
}
