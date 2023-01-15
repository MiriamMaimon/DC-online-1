import { Schema, Document } from "mongoose";
import { ICartComponent } from "./cartComponent.interface";
import { networkSchema } from "../../network/network.schema";

export const cartComponentSchema: Schema = new Schema({
	name: { type: String,
		required: true },
	type: { type: String,
		required: true },
}).add(networkSchema);

interface ICartComponentDocumentBase extends ICartComponent, Document {}

export type CartComponentDocument = ICartComponentDocumentBase;