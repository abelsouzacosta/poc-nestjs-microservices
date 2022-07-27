import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsRepository {
  constructor(
    @InjectModel(Doctor.name) private readonly model: Model<Doctor>,
  ) {}

  async getAll(): Promise<Array<Doctor>> {
    return this.model.find();
  }
}
