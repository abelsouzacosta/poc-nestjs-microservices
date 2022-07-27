import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'doctors',
})
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  register: string;

  @Prop({ required: true })
  speciality: string;
}
