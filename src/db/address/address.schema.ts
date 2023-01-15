import { Schema, Document } from "mongoose";
import { IAddress } from "./address.interface";

export const addressSchema: Schema = new Schema({
	city: { type: String,
		required: false },
	address: { type: String,
		required: false },
	phone: { type: String,
		required: false },
});


interface IAddressDocumentBase extends IAddress, Document {

}

export type AddressDocument = IAddressDocumentBase;



// Virtuals

// Methods

