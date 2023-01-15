import { Schema } from "mongoose";
import { pluginSchema } from "./plugin/plugin.schema";
import { tagSchema } from "./tag/tag.schema";

export const chainBranchSchema: Schema = new Schema({
	name: { type: String,
		required: true },
	logo: { type: String,
		required: false },
	weightAllowedDelta: { type: Number,
		required: false },
	weightUpdateInterval: { type: Number,
		required: false },
	weightUpdateJob: { type:Boolean,
		required: false },
	plugin: [pluginSchema],
	tag: [tagSchema],
	language: [String],
});