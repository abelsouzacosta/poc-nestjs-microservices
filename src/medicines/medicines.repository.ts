import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicinesRepository {
  constructor(
    @InjectModel(Medicine.name) private readonly model: Model<Medicine>,
  ) {}

  async findByProductCode(product_code: string): Promise<boolean> {
    const result = await this.model.findOne({
      product_code,
    });

    return !result ? false : true;
  }

  async find(): Promise<Array<Medicine>> {
    return this.model.find();
  }

  async findById(id: string): Promise<Medicine> {
    return this.model.findById(id);
  }

  async create(medicine: CreateMedicineDto): Promise<Medicine> {
    return this.model.create(medicine);
  }

  async update(
    id: string,
    { name, dosage, active_ingredient, brand, manufacturer }: UpdateMedicineDto,
  ) {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        name,
        dosage,
        active_ingredient,
        brand,
        manufacturer,
      },
    );
  }

  async delete(id: string) {
    return this.model.deleteOne({
      _id: id,
    });
  }
}
