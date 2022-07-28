import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'medicines',
})
export class Medicine {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [String] })
  other_names: string[];

  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  active_ingredient: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true, unique: true })
  product_code: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
