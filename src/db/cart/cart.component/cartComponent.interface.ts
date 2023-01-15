import { Optional } from "../../shared/utils";
import { INetwork } from "../../network/network.interface";


interface ICartComponentBase extends Optional<INetwork, 'ip'> {
	name: string,
	type: CartComponentType,
}

export type ICartComponent = ICartComponentBase

export interface ICartComponentPopulated extends ICartComponentBase {
	componentId: number,
}

export enum CartComponentType {
	CartManager = 1,
	PCLR = 2,
	DeviceManager = 3,
	CartMonitor = 4,
}