import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  SUBJECTS_COLLECTION_NAME,
  TOPICS_COLLECTION_NAME,
  USERS_COLLECTION_NAME,
} from '../../constants';

export enum ContentType {
  THEORY = 'THEORY',
  QUIZ = 'QUIZ',
}

export type ContentItemDocument = HydratedDocument<ContentItem>;

@Schema({ timestamps: true })
export class ContentItem {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String })
  public description: string;

  @Prop({ type: Types.ObjectId, required: true, ref: SUBJECTS_COLLECTION_NAME })
  public subject: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], required: true, ref: TOPICS_COLLECTION_NAME })
  public topics: Array<Types.ObjectId>;

  @Prop({ type: Types.ObjectId, required: true, ref: USERS_COLLECTION_NAME })
  public updatedBy: Types.ObjectId;
}

export const ContentItemSchema = SchemaFactory.createForClass(ContentItem);
