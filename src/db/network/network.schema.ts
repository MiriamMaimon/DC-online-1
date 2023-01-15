import { Schema } from "mongoose";

export const networkSchema: Schema = new Schema({
	ip: { type: String,
		required: false },
	port: { type: Number,
		required: false },
});