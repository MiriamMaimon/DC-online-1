import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
// import { UserService } from '../services/user.service';
import { UserSchema } from '../db/user/user.schema';
// import { UserController } from '../controllers/user.controller';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence/lib/sequence';
import { ChainModule } from './chain.module';
import { BranchModule } from './branch.module';
import { UserRolesModule } from './user-roles.module';
import { AzureADModule } from './azure-ad.module';

@Module({
  imports: [
    forwardRef(() => UserRolesModule),
    forwardRef(() => ChainModule),
    forwardRef(() => BranchModule),
    AzureADModule,

    /*MongooseModule.forFeature([
      { name: 'IChain', schema: chainSchema, }, {
        name: 'Branch', schema: branchSchema,
    }]),*/

    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: async (connection: Connection) => {
          const schema = UserSchema;

          const AI = AutoIncrementFactory(connection);
          schema.plugin(AI, { inc_field: 'userId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],

  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule { }


