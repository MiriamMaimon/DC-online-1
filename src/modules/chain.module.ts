import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
// import { ChainService } from '../services/chain.service';
import { chainSchema } from '../db/chain/chain.schema';
// import { ChainController } from '../controllers/chain.controller';
import { Connection, Schema } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence/lib/sequence';
import { UserModule } from './user.module';

@Module({
	imports: [
		forwardRef(() => UserModule),
		//UserModule,
		MongooseModule.forFeatureAsync([
			{
				name: 'IChain',
				useFactory:(connection: Connection):Schema => {
					const schema = chainSchema;

					const AI = AutoIncrementFactory(connection);

					schema.plugin(AI, { inc_field: 'chainId' });
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
export class ChainModule { }


