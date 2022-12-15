import { BatteryData } from "./cartsMonitor/cartsMonitor.interface";

export interface IMonitorRequest {//<T> {
	cartName: string,
	cartId: string,
	//cartType: CartType,
	cartType: string,
	cartClientNumber: number,
	cartClientId: string,
	edgeName?: string,
	edgeId?: string,
	edgeClientNumber?: number,
	edgeClientId?: string,
	branch?: string,
	branchId?: string,
	branchNumber?: string,
	chain?: string,
	chainId?: string,
	chainNumber?: string,
	createDate: Date,
	state: string | 'real-time' | 'late-bind',
	data: IMonitorData,
	cartStatus:CartStatusData;
}

export type CartStatusData = {
	step: "SYSTEM_READY" | "SHOPPING" | "POS_DOWN" | "OFFLINE" | "NULL",
	sendDate?:string
} 
export interface IMonitorData {
	lastPing?: Date,
	battery?: BatteryData,
	legalScale?: ScaleData;
	securityScale?: ScaleData;
	scanner?: ScannerData;
	mainScanner?: ScannerData;
	accelometer?: AccelometerData;
	devicesStatus?: DevicesStatus,
	cartSatus?:CartStatusData;
}

export type DeviceStatus = "no-device" | "ok" | "error";

export type DevicesStatus = {
	battery: DeviceStatus,
	scanners: (DeviceStatus)[],
	led: DeviceStatus,
	securityScale: DeviceStatus,
	legalScale: DeviceStatus,
	accelerometer: DeviceStatus,
}

export class AccelometerData {
	acceleration: number; // 0-2
	deceleration: number; // 0-2
}

export class ScaleData {
	weightKg: number;
	isStable: boolean;
	isOveloaded: boolean;
}

export class ScannerData {
	lastScan: string;
}
