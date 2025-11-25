import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String })
  public description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
