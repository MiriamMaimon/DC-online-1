import  { Schema, Document } from "mongoose";
import { IAuthorization } from "./authorization.interface";
import * as bcrypt from 'bcryptjs';

// const saltRounds = 10;

export const authorizationSchema: Schema = new Schema({
	username: {
		type: String,
		unique: false,
		required: false,
		lowercase: true 
	},
	password: { type: String,
		required: false },

});

authorizationSchema.index({ username: 1 }, { unique: true });


interface IAuthorizationDocumentBase extends IAuthorization, Document {    
	isPasswordValid(): boolean;
}

export type AuthorizationDocument = IAuthorizationDocumentBase;


// Virtuals

// Methods
authorizationSchema.methods.isPasswordValid = async function (password):Promise<any> {
	const obj = this as unknown as AuthorizationDocument;
	const compare = await bcrypt.compare(password, obj.password);

	return compare;
};

// Document middlewares
// IAuthorization.pre<AuthorizationDocument>("save", async function () {
// 	if (this.isModified("password")) {
// 		const obj = this;
// 		const hash = await bcrypt.hash(obj.password, saltRounds);

// 		obj.password = hash;
// 	}
    
// });
