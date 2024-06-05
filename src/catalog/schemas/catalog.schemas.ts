import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CatalogCategory {
  SHIRT = 'shirt',
  DRESS = 'dress',
  SUIT = 'suit',
  TOP = 'top',
  SWEATER = 'sweater',
  SKIRT = 'skirt',
  PANTS = 'pants',
  SPORTSWEAR = 'sportswear',
}

@Schema({ timestamps: true })
export class Catalog extends Document {
  @Prop({ required: true })
  category: CatalogCategory;

  @Prop({ required: true })
  name: string;

  @Prop()
  material: string;

  @Prop({ type: [String], required: true })
  sizes: string[];

  @Prop({ type: [String], required: true })
  colors: string[];

  @Prop()
  price: number;

  @Prop({ required: true })
  image: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
