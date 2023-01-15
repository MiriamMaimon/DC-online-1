import { Schema, Document } from "mongoose";
import { addressSchema } from "../address/address.schema";
import { defaultSchema } from "../default/default.schema";
import { networkSchema } from "../network/network.schema";
import { IChain } from "./chain.interface";
import { chainBranchSchema } from "../chainBranch/chainBranch.schema";

export const chainSchema: Schema = new Schema({
	dataCenterId: {type: Schema.Types.ObjectId,
		required: false},
	syncMainDataCenter: {type: Boolean,
		required: false},
})
	.add(chainBranchSchema).add(defaultSchema).add(addressSchema).add(networkSchema);

chainSchema.index({ name: 1}, { unique: true });

interface IChainDocumentBase extends IChain, Document { }

export type ChainDocument = IChainDocumentBase;

// Virtuals

chainSchema.virtual('branches', {
	ref: 'Branch', 
	localField: '_id', 
	foreignField: 'chainId',
});
 
// Methods

