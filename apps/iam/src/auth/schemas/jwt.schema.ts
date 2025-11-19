import { Types } from 'mongoose';
import { Role } from '../../users/schemas';

export type JwtPayload = {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: Role;
};
