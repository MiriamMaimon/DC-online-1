import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
// import { BranchService } from '../services/branch.service';
import { branchSchema } from '../db/branch/branch.schema';
// import { BranchController } from '../controllers/branch.controller';
import { Connection, Schema } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence/lib/sequence';
import { ChainModule } from './chain.module';
import { UserModule } from './user.module';

@Module({
	imports: [

		forwardRef(() => UserModule),
		forwardRef(() => ChainModule),
		//MongooseModule.forFeature([{ name: 'IChain', schema: chainSchema, }]),

		MongooseModule.forFeatureAsync([
			{
				name: 'Branch',
				useFactory:(connection: Connection):Schema => {
					const schema = branchSchema;
        
					const AI = AutoIncrementFactory(connection);

					schema.plugin(AI, {inc_field: 'branchId'});
					return schema;
				},
				inject: [getConnectionToken()],
			},
		]),

	],
	controllers: [],
	providers: [],
	exports:[]
})
export class BranchModule {}


 