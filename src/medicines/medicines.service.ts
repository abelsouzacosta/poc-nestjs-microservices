import { Injectable, Logger } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';
import { ImportService } from './import.service';
import { MedicinesRepository } from './medicines.repository';

@Injectable()
export class MedicinesService {
  constructor(
    private readonly repository: MedicinesRepository,
    private readonly importService: ImportService,
  ) {}

  create(data: CreateMedicineDto): Promise<Medicine> {
    return this.repository.create(data);
  }

  findAll(): Promise<Array<Medicine>> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Medicine> {
    return this.repository.findById(id);
  }

  update(id: string, data: UpdateMedicineDto) {
    return this.repository.update(id, data);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }

  async import(file: Express.Multer.File): Promise<void> {
    const loadedFile = await this.importService.loadFile(file);

    loadedFile.map(
      async ({
        name,
        other_names,
        dosage,
        active_ingredient,
        brand,
        manufacturer,
        product_code,
      }) => {
        const productCodeAlreadyExists =
          await this.repository.findByProductCode(product_code);

        console.log(productCodeAlreadyExists);

        if (productCodeAlreadyExists)
          Logger.log(
            `product_code ${product_code} already exists in the database - medicine will be ignored`,
          );
        else
          await this.create({
            name,
            other_names,
            dosage,
            active_ingredient,
            brand,
            manufacturer,
            product_code,
          });
      },
    );
  }
}
