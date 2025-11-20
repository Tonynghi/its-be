import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
}

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
