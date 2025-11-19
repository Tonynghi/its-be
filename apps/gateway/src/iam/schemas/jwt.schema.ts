import { Types } from 'mongoose';
import { Role } from './user.schema';

export type JwtPayload = {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: Role;
};
