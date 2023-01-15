import { Schema, Document } from 'mongoose';
import { IMonitorRequest } from './monitor.interface';

//const AutoIncrement = require('mongoose-sequence')(mongoose);

export const batteryDataSchema = new Schema({
	
	// /*type: { type: String, required: false },
	// percentage: { type: Number, required: false },
	// currentMAh: { type: Number, required: false },
	// chargeState: { type: Boolean, required: false },
	// batteryTemp: { type: Number, required: false },
	// outVolt: { type: Number, required: false },
	// inputVolt: { type: Number, required: false },
	// boardTemp: { type: Number, required: false },
	// chargeEfficency: { type: Number, required: false }*/
	batteryStatus: { type: Number,
		required: true },
	chargingStatus: { type: Number,
		required: true },
	chargerStatus: { type: Number,
		required: true },
});

export const legalScaleDataSchema = new Schema({
	
	isOveloaded: { type: Schema.Types.Boolean,
		required: true },
	isStable: { type: Schema.Types.Boolean,
		required: true },
	weightKg: { type: Schema.Types.Number,
		required: true },
});

export const securityScaleDataSchema = new Schema({
	isOveloaded: { type: Schema.Types.Boolean,
		required: true },
	isStable: { type: Schema.Types.Boolean,
		required: true },
	weightKg: { type: Schema.Types.Number,
		required: true },
});

export const scannerDataSchema = new Schema({
	lastScan: { type: Schema.Types.String,
		required: true },
});

export const accelometerDataSchema = new Schema({
	
	acceleration: { type: Schema.Types.Number,
		required: true },
	deceleration: { type: Schema.Types.Number,
		required: true },
});

export const cartStatusDataSchema = new Schema({
	
	step: { type: Schema.Types.String,
		required: true },
	sendDate: { type: Schema.Types.String,
		required: true },
});
export const dataMonitorDataSchema = new Schema({
	
	battery: { type: batteryDataSchema,
		required: false },
	legalScale: { type: legalScaleDataSchema,
		required: false },
	securityScale: { type: securityScaleDataSchema,
		required: false },
	scanner: { type: scannerDataSchema,
		required: false },
	accelometer: { type: accelometerDataSchema,
		required: false },
	cartStatus: { type: cartStatusDataSchema,
		required: false },
});

export const monitorDataSchema: Schema = new Schema({
	cartName: { type: String,
		required: true },
	cartNumber: { type: String,
		required: true },
	cartType: { type: String,
		required: true },
	cartClientNumber: { type: Number,
		required: false },
	cartClientId: { type: String,
		required: false },
	createDate: { type: Schema.Types.Date,
		required: true },
	edgeName: { type: String,
		required: false },
	edgeId: { type: String,
		required: false },
	edgeClientNumber: { type: Number,
		required: false },
	edgeClientId: { type: String,
		required: false },
	branch: { type: String,
		required: false },
	branchId: { type: String,
		required: false },
	branchNumber: { type: String,
		required: false },
	chain: { type: String,
		required: false },
	chainId: { type: String,
		required: false },
	chainNumber: { type: String,
		required: false },
	state: { type: String,
		required: false,
		default: 'real-time' },
	data: { type: dataMonitorDataSchema,
		required: true },
});

monitorDataSchema.index({ chainId: 1 }, { unique: false });
monitorDataSchema.index({ branchId: 1 }, { unique: false });
monitorDataSchema.index({ chain: 1 }, { unique: false });
monitorDataSchema.index({ branch: 1 }, { unique: false });
monitorDataSchema.index({ edgeId: 1 }, { unique: false });

interface IMonitorDocumentBase extends IMonitorRequest, Document {}

export type MonitorDocument = IMonitorDocumentBase;

//MonitorDataSchema.plugin(AutoIncrement, { inc_field: "monitorDataId" });
