import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/Patient';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { AddressService } from './address.service';
import { ImportService } from './import.service';
import { MulterModule } from '@nestjs/platform-express';
import { PatientNotFoundMiddleware } from './infra/middlewares/patient-not-found.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    MulterModule.register({
      dest: './uploads/patients',
    }),
  ],
  providers: [PatientRepository, PatientService, AddressService, ImportService],
  controllers: [PatientController],
})
export class PatientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PatientNotFoundMiddleware)
      .forRoutes(
        { path: '/patient/:id', method: RequestMethod.GET },
        { path: '/patient/:id', method: RequestMethod.PUT },
      );
  }
}
