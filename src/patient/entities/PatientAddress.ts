import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({})
export class PatientAddress {
  @Prop({ required: false, type: String, default: 'Brasil' })
  country?: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  zipcode: string;
}

export const PatientAddressSchema =
  SchemaFactory.createForClass(PatientAddress);
