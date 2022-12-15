import { Schema } from "mongoose";
//import { defaultSchema } from "../../default/default.schema";

export const tagSchema: Schema = new Schema({
	tag: { type: String,
		required: true },
	value: { type: String,
		required: true },
	enable: { type: Boolean,
		required: false,
		default: true },
    
});/*.add(defaultSchema);*/