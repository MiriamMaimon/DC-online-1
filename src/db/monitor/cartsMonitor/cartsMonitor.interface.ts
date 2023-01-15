import { ObjectId } from "mongoose";

export interface ICartsMonitorRequest {
	cartID: ObjectId | string,
	battery?: BatteryData,
	legalScale?: ScaleData;
	mainScanner?: DeviceStatus,
	led?: DeviceStatus,
	securityScale?: ScaleData;
	accelometer?: AccelometerData;
	lastPing? : Date;
	cartStatus?:CartStatusData;
}
export type DeviceStatus = "no-device" | "ok" | "error";

export type CartStatusData = {
	step: "SYSTEM_READY" | "SHOPPING" | "POS_DOWN" | "OFFLINE" | "NULL";
	sendDate?:string;
}
export class AccelometerData {
	acceleration: number; // 0-2
	deceleration: number; // 0-2
}

export class BatteryData {
	chargingStatus: 0 | 1 | 2 | 3 | 4 | 5;  
	chargerStatus: 0 | 1 | 2; 
	batteryStatus: number; 
}

export class ScaleData {
	weightKg: number;
	isStable: boolean;
	isOveloaded: boolean;
}

export class ScannerData {
	lastScan: string;
}
