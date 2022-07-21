import { Injectable } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { Patient } from './entities/Patient';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(
    private readonly repository: PatientRepository,
    private readonly addressService: AddressService,
  ) {}

  async list(): Promise<Array<Patient>> {
    return this.repository.getAll();
  }

  async create({
    name,
    ssn,
    email,
    date_birth,
    height,
    weight,
    blood_type,
    zipcode,
    number,
    phones,
  }: CreatePatientDto): Promise<Patient> {
    const addresses: any[] = [];

    const { state, city, district, street } =
      await this.addressService.getAddressZipcode(zipcode);

    const address = { state, city, district, street, number, zipcode };

    addresses.push(address);

    return this.repository.createPatient({
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
