import { JwtPayload } from '../schemas';

export type CustomRequest = Request & { user?: JwtPayload };
