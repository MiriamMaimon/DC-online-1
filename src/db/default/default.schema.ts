import { Schema, Document } from "mongoose";
import { IDefault } from "./default.interface";

export const defaultSchema: Schema = new Schema({
	active: { type: Boolean,
		required: true,
		default: true },
	createDate: { type: Date,
		require: true,
		default: new Date() }
});


interface IDefaultDocumentBase extends IDefault, Document {

}

export type DefaultDocument = IDefaultDocumentBase;//IDefault & Document;



// Virtuals

// Methods

