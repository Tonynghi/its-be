import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public email: string;

  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: String, required: true, default: Role.STUDENT, enum: Role })
  public role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
