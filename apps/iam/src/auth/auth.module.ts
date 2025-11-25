import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { UsersService } from '../users/services';
import { AuthController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_COLLECTION_NAME } from '../constants';
import { UserSchema } from '../users/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USERS_COLLECTION_NAME,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
