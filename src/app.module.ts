import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from './patient/patient.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicinesModule } from './medicines/medicines.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    PatientModule,
    DoctorsModule,
    MedicinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
