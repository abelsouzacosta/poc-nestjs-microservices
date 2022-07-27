import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsRepository {
  constructor(
    @InjectModel(Doctor.name) private readonly model: Model<Doctor>,
  ) {}

  async getAll(): Promise<Array<Doctor>> {
    return this.model.find();
  }

  async findById(id: string): Promise<Doctor> {
    return this.model.findById(id);
  }

  async create({
    name,
    register,
    speciality,
  }: CreateDoctorDto): Promise<Doctor> {
    return this.model.create({
      name,
      register,
      speciality,
    });
  }
}
