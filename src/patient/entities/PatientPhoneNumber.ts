import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PhoneTypeEnum } from 'src/shared/enums/PhoneType.enum';

@Schema()
export class PatientPhoneNumber {
  @Prop({ required: true, enum: PhoneTypeEnum })
  type: string;

  @Prop({ required: true })
  number: string;
}

export const PatientPhoneNumberSchema =
  SchemaFactory.createForClass(PatientPhoneNumber);
