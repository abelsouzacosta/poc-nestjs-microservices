import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/Patient';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { AddressService } from './address.service';
import { ImportService } from './import.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [PatientRepository, PatientService, AddressService, ImportService],
  controllers: [PatientController],
})
export class PatientModule {}
