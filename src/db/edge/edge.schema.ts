import { Schema, Document } from "mongoose";
import { defaultSchema } from "../default/default.schema";
import { networkSchema } from "../network/network.schema";
import * as crypto from "crypto-js";
//import { defultSettings } from "src/config/configuration";
import * as defultSettings  from "src/config/settings.default.json";
import { IEdgeBase } from "./edge.interface";
import { logger } from "@c2m/c2m-logger";

export const edgeSchema: Schema = new Schema({
	name: { type: String,
		required: true ,
		unique: false},
	loginToken: { type: String,
		unique: true,
		required: true },
	branches: { type: [Schema.Types.ObjectId],
		required: true,
		ref: 'Branch' },
	chains: { type: [Schema.Types.ObjectId],
		required: true,
		ref: 'IChain' },
})
	.add(defaultSchema).add(networkSchema);

edgeSchema.index({ name: 1 }, { unique: false });
edgeSchema.index({ loginToken: 1 }, { unique: true });
edgeSchema.index({ chains: 1 }, { unique: false });
edgeSchema.index({ branches: 1 }, { unique: false });

interface IEdgeDocumentBase extends IEdgeBase, Document {}

export type EdgeDocument = IEdgeDocumentBase;

const privateKey = process.env.DATACENTER_PRIVATE_KEY || defultSettings.privateKey;

// Virtuals

edgeSchema.virtual('carts', {
	ref: 'Cart',
	localField: '_id',
	foreignField: 'edge',
});


//EdgeSchema.set('toObject', { virtuals: true });
//EdgeSchema.set('toJSON', { virtuals: true });

// Methods

// Document middlewares
edgeSchema.pre<EdgeDocument>("save", async function () {
	if (this.isModified("loginToken")) {
		logger.info(`org token:${this.loginToken}`);
		this.isModified = crypto.AES.encrypt(this.loginToken, privateKey).toString();
	}
   
});
