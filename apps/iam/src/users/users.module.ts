import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_COLLECTION_NAME } from '../constants';
import { UserSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USERS_COLLECTION_NAME,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
