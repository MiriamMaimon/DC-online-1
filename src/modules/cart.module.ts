import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from '../db/cart/cart.schema';
import { Schema } from 'mongoose';
import { BranchModule } from './branch.module';
import { EdgeModule } from './edge.module';
// import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

@Module({
	imports: [
		BranchModule,
		forwardRef(() => EdgeModule),
		/*MongooseModule.forFeature([
      { name: 'Edge', schema: EdgeSchema, },
      { name: 'Branch', schema: branchSchema, },
      { name: 'IChain', schema: chainSchema, }]),*/

		MongooseModule.forFeatureAsync([
			{
				name: 'Cart',
				useFactory: ():Schema => {
					const schema = cartSchema;

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
export class CartModule { }


