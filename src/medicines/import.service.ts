import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { createReadStream, promises } from 'fs';

interface IImportMedicine {
  name: string;
  other_names: Array<string>;
  dosage: string;
  active_ingredient: string;
  brand: string;
  manufacturer: string;
  product_code: string;
}

@Injectable()
export class ImportService {
  private medicines: Array<IImportMedicine>;

  constructor() {
    this.medicines = [];
  }

  async loadFile(file: Express.Multer.File): Promise<Array<IImportMedicine>> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);

      const fileParser = parse({});

      stream.pipe(fileParser);

      fileParser
        .on('data', (line) => {
          const [
            name,
            name_1,
            dosage,
            active_ingredient,
            brand,
            manufacturer,
            product_code,
          ] = line;

          const other_names = [name_1];

          this.medicines.push({
            name,
            other_names,
            dosage,
            active_ingredient,
            brand,
            manufacturer,
            product_code,
          });
        })
        .on('end', () => {
          promises.unlink(file.path);
          resolve(this.medicines);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
