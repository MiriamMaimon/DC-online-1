import { Schema, Document } from "mongoose";
import { addressSchema } from "../address/address.schema";
import { defaultSchema } from "../default/default.schema";

import { IBranch } from "./branch.interface";
import { chainBranchSchema } from "../chainBranch/chainBranch.schema";

export const branchSchema: Schema = new Schema({
	chain: { type: Schema.Types.ObjectId,
		required: true,
		ref: 'IChain' },
	setupId: { type: String,
		required: true,
		unique: true },
}).add(chainBranchSchema).add(defaultSchema).add(addressSchema);

branchSchema.index({ name: 1,
	chain: 1 }, { unique: true });
branchSchema.index({ chain: 1 }, { unique: false });
//branchSchema.index({ setupId: 1 }, { unique: true })

interface IBranchDocumentBase extends IBranch, Document { }

export type BranchDocument = IBranchDocumentBase;


// Virtuals
/*branchSchema.virtual('edges', {
    ref: 'Edge', 
    localField: '_id', 
    foreignField: 'branches',
 });*/


branchSchema.set('toObject', { virtuals: true });
branchSchema.set('toJSON', { virtuals: true });

// Document middlewares
