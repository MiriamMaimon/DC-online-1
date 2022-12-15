import { Schema } from "mongoose";
// import { defaultSchema } from "../../default/default.schema";

export const pluginSchema: Schema = new Schema({
	name: { type: String,
		required: true },
	type: { type: String,
		required: true },
	enable: { type: Boolean,
		required: false,
		default: true },
	params: { type: Map,
		of: String ,
		required: false},
});/*.add(defaultSchema);*/