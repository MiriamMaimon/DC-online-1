import { forwardRef, Module } from '@nestjs/common';
// import { UserRolesService } from '../services/user-roles.service';
// import { UserRolesController } from '../controllers/user-roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { userRoleSchema } from '../db/userRole/user-role.schema';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),

    MongooseModule.forFeatureAsync([
      {
        name: 'UserRole',
        useFactory: async (connection: Connection) => {
          const schema = userRoleSchema;
          return schema;
        },
        collection : "userRoles"
      },
    ]),

    
  ],

  controllers: [],
  providers: [],
  exports: []
  
  // controllers: [UserRolesController],
  // providers: [UserRolesService],
  // exports: [UserRolesService]
})
export class UserRolesModule {}
