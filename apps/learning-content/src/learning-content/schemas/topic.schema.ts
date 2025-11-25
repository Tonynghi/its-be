import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SUBJECTS_COLLECTION_NAME } from '../../constants';

export type TopicDocument = HydratedDocument<Topic>;

@Schema({ timestamps: true })
export class Topic {
  @Prop({ type: Types.ObjectId, required: true, ref: SUBJECTS_COLLECTION_NAME })
  public subject: Types.ObjectId;

  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String })
  public description: string;

  @Prop({ type: [String] })
  public tags: Array<string>;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
