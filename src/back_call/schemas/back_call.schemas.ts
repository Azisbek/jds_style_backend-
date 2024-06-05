import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BackCall {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  number: string;
}

export const BackCallSchema = SchemaFactory.createForClass(BackCall);
