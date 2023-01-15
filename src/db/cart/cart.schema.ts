import { logger } from '@c2m/c2m-logger';
import { Schema, Document } from "mongoose";
import { ICart } from "./cart.interface";
import { defaultSchema } from "..//default/default.schema";
import * as crypto from "crypto-js";
import { cartComponentSchema } from "./cart.component/cartComponent.schema";
//import { defultSettings } from "src/config/configuration";
import * as defultSettings  from "src/config/settings.default.json";

export const cartSchema: Schema = new Schema({

	name: { type: String,
		required: true },
	type: { type: String,
		unique: false,
		required: true },
	loginToken: { type: String,
		unique: true,
		required: true },
	dimension: { type: String,
		required: true },
	branch: { type: Schema.Types.ObjectId,
		required: true,
		ref: 'Branch' },
	cartNumber: {type: Number,
		required: false},
	component: [cartComponentSchema]
}).add(defaultSchema);

cartSchema.index({ name: 1,
	branch: 1 }, { unique: false });
cartSchema.index({ loginToken: 1 }, { unique: true });
cartSchema.index({ branch: 1 }, { unique: false });
cartSchema.set('toObject', { getters: true });

interface ICartDocumentBase extends ICart, Document { }

export type CartDocument = ICartDocumentBase;

const privateKey = process.env.DATACENTER_PRIVATE_KEY || defultSettings.privateKey;

// Virtuals
cartSchema.virtual('monitor', {
	ref: 'CartsMonitor',
	localField: '_id',
	foreignField: 'cartID',
	justOne: true,
	options: { sort: { _id: -1 } }
});

cartSchema.virtual('cartStatus').get(function() {
	return (Math.floor(new Date().getTime() - this.monitor?.lastPing?.getTime()) / 1000 > 60) || this.monitor?.lastPing === undefined ? 0 : 2;
});

cartSchema.pre<CartDocument>("save", async function () {
	if (this.isModified("loginToken")) {
		logger.info(`org token:${this.loginToken}`);
		this.isModified = crypto.AES.encrypt(this.loginToken, privateKey).toString();
	}
    
});

/*
CartSchema.set('toObject', {
    virtuals: true, versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
CartSchema.set('toJSON', {
    virtuals: true, versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
*/
// Methods

