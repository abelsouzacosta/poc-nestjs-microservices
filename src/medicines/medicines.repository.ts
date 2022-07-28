import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicinesRepository {
  constructor(
    @InjectModel(Medicine.name) private readonly model: Model<Medicine>,
  ) {}

  async findByProductCode(product_code: string): Promise<boolean> {
    const result = this.model.findOne({
      product_code,
    });

    return !result ? false : true;
  }

  async create(medicine: CreateMedicineDto) {
    return this.model.create(medicine);
  }
}
