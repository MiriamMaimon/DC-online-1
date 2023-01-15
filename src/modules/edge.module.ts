import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { edgeSchema } from '../db/edge/edge.schema';
import { Connection, Schema } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence/lib/sequence';
import { BranchModule } from './branch.module';
import { ChainModule } from './chain.module';

@Module({
	imports: [
		forwardRef(() => ChainModule),
		forwardRef(() => BranchModule),   
		/*MongooseModule.forFeature([
      { name: 'Branch', schema: branchSchema, },
      { name: 'IChain', schema: chainSchema, }]),*/

		MongooseModule.forFeatureAsync([
			{
				name: 'Edge',
				useFactory: (connection: Connection):Schema => {
					const schema = edgeSchema;

					const AI = AutoIncrementFactory(connection);

					schema.plugin(AI, { inc_field: 'edgeId' });
					return schema;
				},
				inject: [getConnectionToken()],
			},
		]),

	],
	controllers: [],
	providers: [],
	exports: []
})
export class EdgeModule { }


