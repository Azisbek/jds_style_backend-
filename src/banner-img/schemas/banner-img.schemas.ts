import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BannerImg {
  @Prop({ required: true })
  image: string;

  @Prop()
  description: string;
}

export const BannerImgSchemas = SchemaFactory.createForClass(BannerImg);
