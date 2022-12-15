import { Schema, Document } from "mongoose";
import { IUserRole } from "./user-role.interface";

export const userRoleSchema: Schema = new Schema({
	name: { type: String,
		required: true ,
		unique: true},
	permissions: { type : Schema.Types.Array,
		default : [] },
	active: { type : Schema.Types.Boolean,
		default : true }
});
userRoleSchema.index({ name: 1 }, { unique: true });
interface IUserRoleDocumentBase extends IUserRole, Document {}

export type UserRoleDocument = IUserRoleDocumentBase;
