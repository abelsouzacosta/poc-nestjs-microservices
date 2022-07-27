import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from './doctors.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly repository: DoctorsRepository) {}

  create(data: CreateDoctorDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.getAll();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }
}
