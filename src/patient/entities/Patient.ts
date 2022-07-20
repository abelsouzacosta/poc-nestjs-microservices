import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BloodTypeEnum } from 'src/shared/enums/BloodType.enum';
import { PatientAddress, PatientAddressSchema } from './PatientAddress';
import {
  PatientPhoneNumber,
  PatientPhoneNumberSchema,
} from './PatientPhoneNumber';

@Schema({
  timestamps: true,
  collection: 'patients',
})
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  ssn: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  date_birth: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true, enum: BloodTypeEnum })
  blood_type: string;

  @Prop({ required: true, type: [PatientAddressSchema] })
  addresses: [PatientAddress];

  @Prop({ required: true, type: [PatientPhoneNumberSchema] })
  phones: [PatientPhoneNumber];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
