import {  Schema, Document } from "mongoose";
import { ICartsMonitorRequest } from "./cartsMonitor.interface";

export const batteryDataSchema = new Schema({
	batteryStatus: { type: Number,
		required: true },
	chargingStatus: { type: Number,
		required: true },
	chargerStatus: { type: Number,
		required: true },
});

export const securityScaleDataSchema = new Schema({
	isOveloaded: {type: Schema.Types.Boolean,
		required: true },
	isStable: {type: Schema.Types.Boolean,
		required: true },
	weightKg: {type: Schema.Types.Number,
		required: true },
});

export const scannerDataSchema = new Schema({
	lastScan: {type: Schema.Types.String,
		required: true },
});

export const accelometerDataSchema = new Schema({
	acceleration: {type: Schema.Types.Number,
		required: true },
	deceleration: {type: Schema.Types.Number,
		required: true },
});

export const cartStatusDataSchema = new Schema({
	step: {type: Schema.Types.String,
		required: true },
	sendDate: {type: Schema.Types.String,
		required: true },
});

export const cartsMonitorSchema = new Schema({
	cartID: {
		type: Schema.Types.ObjectId,
		required: true ,
		unique : true,
		ref: 'Cart'
	},
	battery: { type: batteryDataSchema,
		required: false },
	legalScale: { type: securityScaleDataSchema,
		required: false },
	mainScanner: { type: scannerDataSchema,
		required: false },
	led: { type: Object,
		required: false },
	securityScale: { type: Object,
		required: false },
	accelometer: { type: accelometerDataSchema,
		required: false },
	lastPing: { type: Date,
		required: false },
	cartStatus: { type: cartStatusDataSchema,
		required: false  }
});


export type DeviceStatus = "no-device" | "ok" | "error";


cartsMonitorSchema.index({ cartID: 1 }, { unique: true });
cartsMonitorSchema.index({ battery: 1 }, { unique: false });
cartsMonitorSchema.index({ legalScale: 1 }, { unique: false });
cartsMonitorSchema.index({ scanners: 1 }, { unique: false });
cartsMonitorSchema.index({ led: 1 }, { unique: false });
cartsMonitorSchema.index({ securityScale: 1 }, { unique: false });
cartsMonitorSchema.index({ accelometer: 1 }, { unique: false });
cartsMonitorSchema.index({ lastPing: 1 }, { unique: false });
cartsMonitorSchema.index({ cartStatus: 1 }, { unique: false });

interface ICartsMonitorDocumentBase extends ICartsMonitorRequest, Document {}

export type CartsMonitorDocument = ICartsMonitorDocumentBase;


