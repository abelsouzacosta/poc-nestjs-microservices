import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicinesRepository } from './medicines.repository';

@Injectable()
export class MedicinesService {
  constructor(private readonly repository: MedicinesRepository) {}

  create(data: CreateMedicineDto): Promise<Medicine> {
    return this.repository.create(data);
  }

  findAll(): Promise<Array<Medicine>> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Medicine> {
    return this.repository.findById(id);
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return `This action updates a #${id} medicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
