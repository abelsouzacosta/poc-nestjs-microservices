import { Injectable, Logger } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { CreatePatientAddressDto } from './dtos/CreatePatientAddress.dto';
import { CreatePhoneNumberController } from './dtos/CreatePhoneNumberController.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
import { Patient } from './entities/Patient';
import { PatientAddress } from './entities/PatientAddress';
import { ImportService } from './import.service';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(
    private readonly repository: PatientRepository,
    private readonly addressService: AddressService,
    private readonly importService: ImportService,
  ) {}

  async list(): Promise<Array<Patient>> {
    return this.repository.getAll();
  }

  async getAddress(zipcode: string) {
    const { state, city, district, street } =
      await this.addressService.getAddressZipcode(zipcode);

    return { state, city, district, street };
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
    const addresses: PatientAddress[] = [];

    const address = await this.getAddress(zipcode);

    const newAddress = { ...address, zipcode, number };

    addresses.push(newAddress);

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

  async addAddress(id: string, { number, zipcode }: CreatePatientAddressDto) {
    const newAddress = await this.getAddress(zipcode);

    const address: PatientAddress = { ...newAddress, zipcode, number };

    return this.repository.addAddressToClient({ id, ...address });
  }

  async addPhone(
    id: string,
    { phones }: CreatePhoneNumberController,
  ): Promise<Patient> {
    for (const phone of phones) {
      this.repository.addPhoneToClient({ id, phone });
    }

    return this.repository.findById(id);
  }

  async update(id: string, { height, weight }: UpdatePatientDto) {
    return this.repository.update({ id, height, weight });
  }

  async import(file: Express.Multer.File): Promise<void> {
    const loadedFile = await this.importService.loadFile(file);

    loadedFile.map(
      async ({
        name,
        ssn,
        email,
        date_birth,
        height,
        weight,
        blood_type,
        zipcode,
        number,
      }) => {
        const ssnAlreadyExists = await this.repository.findBySsn(ssn);

        if (ssnAlreadyExists) {
          Logger.log(
            `ssn: ${ssn} already exists in the database - patient ignored`,
          );
        } else {
          await this.create({
            name,
            ssn,
            email,
            date_birth,
            height,
            weight,
            blood_type,
            zipcode,
            number,
            phones: [],
          });
        }
      },
    );
  }
}
