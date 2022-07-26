import { Injectable } from '@nestjs/common';
import { AddressService } from './address.service';
import { createReadStream, promises } from 'fs';
import { parse } from 'csv-parse';

interface IImportPatient {
  name: string;
  ssn: string;
  email: string;
  date_birth: string;
  height: string;
  weight: string;
  blood_type: string;
  zipcode: string;
  number: number;
}

@Injectable()
export class ImportService {
  private patients: IImportPatient[];

  constructor(private readonly addressSrevice: AddressService) {
    this.patients = [];
  }

  async loadFile(file: Express.Multer.File): Promise<Array<IImportPatient>> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);

      const fileParser = parse({});

      stream.pipe(fileParser);

      fileParser
        .on('data', (line) => {
          const [
            name,
            ssn,
            email,
            date_birth,
            height,
            weight,
            blood_type,
            zipcode,
            number,
          ] = line;

          this.patients.push({
            name,
            ssn,
            email,
            date_birth,
            height,
            weight,
            blood_type,
            zipcode,
            number,
          });
        })
        .on('end', () => {
          promises.unlink(file.path);
          resolve(this.patients);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
