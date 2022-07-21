import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/Patient';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { AddressService } from './address.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  providers: [PatientRepository, PatientService, AddressService],
  controllers: [PatientController],
})
export class PatientModule {}
