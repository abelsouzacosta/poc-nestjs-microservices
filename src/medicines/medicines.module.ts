import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { MedicinesRepository } from './medicines.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicine, MedicineSchema } from './entities/medicine.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImportService } from 'src/medicines/import.service';
import { MedicineNotFoundMiddleware } from './infra/middlewares/medicine-not-found.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
    MulterModule.register({
      dest: './uploads/medicines',
    }),
  ],
  controllers: [MedicinesController],
  providers: [MedicinesService, MedicinesRepository, ImportService],
})
export class MedicinesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MedicineNotFoundMiddleware)
      .forRoutes(
        { path: 'medicines/:id', method: RequestMethod.DELETE },
        { path: 'medicines/:id', method: RequestMethod.PATCH },
        { path: 'medicines/:id', method: RequestMethod.GET },
      );
  }
}
