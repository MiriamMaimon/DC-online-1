import { Schema, Document } from "mongoose";
import { IMonitorUpdates } from "./monitorUpdates.interface";


export const monitorUpdatesSchema = new Schema({
	cartID: { type: Schema.Types.ObjectId,
		required: true,
		unique: false },
	type: { type: String,
		required: true,
		unique: false },
	data: { type: Object,
		required: true,
		unique: false },
	time: { type: Date,
		required: true,
		unique: false },
});

monitorUpdatesSchema.index({ cartID: 1 }, { unique: false });
monitorUpdatesSchema.index({ type: 1 }, { unique: false });
monitorUpdatesSchema.index({ data: 1 }, { unique: false });
monitorUpdatesSchema.index({ time: 1 }, { unique: false });

interface IMonitorUpdatesDocumentBase extends IMonitorUpdates, Document { }

export type MonitorUpdatesDocument = IMonitorUpdatesDocumentBase;


