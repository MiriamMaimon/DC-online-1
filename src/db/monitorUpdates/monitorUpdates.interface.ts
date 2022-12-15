import { ObjectId } from 'mongoose';
import {AccelometerData,
	BatteryData,
	DeviceStatus,
	ScaleData,
	ScannerData,
	CartStatusData,} from '../monitor/cartsMonitor/cartsMonitor.interface';

export interface IMonitorUpdates {
	cartID: ObjectId | string;
	type: IMonitorUpdatesTypes;
	data: IMonitorUpdatesData;
	time: Date;
}

export interface IMonitorRequest {
	//<T> {
	cartName: string;
	cartId: string;
	cartType: string;
	cartClientNumber: number;
	cartClientId: string;
	edgeName?: string;
	edgeId?: string;
	edgeClientNumber?: number;
	edgeClientId?: string;
	branch?: string;
	branchId?: string;
	branchNumber?: string;
	chain?: string;
	chainId?: string;
	chainNumber?: string;
	monitorData: IMonitorUpdates[];
}

export declare type IMonitorUpdatesTypes =
  | 'battery'
  | 'legalScale'
  | 'mainScanner'
  | 'led'
  | 'securityScale'
  | 'accelometer'
  | 'lastPing'
  | 'cartStatus';
export declare type IMonitorUpdatesData =
  | DeviceStatus
  | AccelometerData
  | BatteryData
  | ScaleData
  | ScannerData
  | CartStatusData;
