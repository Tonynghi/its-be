import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
}

@Schema()
export class User {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public email: string;

  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: String, required: true, default: Role.STUDENT, enum: Role })
  public role: Role;

  @Prop({ type: Date, default: Date.now })
  public createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  public updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
