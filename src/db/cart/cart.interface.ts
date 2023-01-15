import { Types } from "mongoose";

import { IDefault } from "../default/default.interface";
import { IBranchPopulated } from "../branch/branch.interface";
import { ICartComponent } from "./cart.component/cartComponent.interface";
import { IMonitorData} from "../monitor/monitor.interface";
// import { ClientType } from "../../sockets/connection";
import { IsNotEmpty } from "class-validator";

interface ICartBase extends IDefault {
	name: string,
	dimension: CartDimension,
	type: CartType,
	cartNumber?: number,
	loginToken:string,
	component: ICartComponent[]
}

export interface ICart extends ICartBase {
	branch: Types.ObjectId,
}

export interface ICartPopulated extends ICartBase {
	branch: IBranchPopulated,
	monitor: IMonitorData,
	cartStatus: number,
	cartNumber: number,
}

export enum CartType
	{
	ShopingCart = 1,
	Scale = 2,
	Pos = 3,
}


export enum CartDimension
	{
	L300 = 1,
	L600 = 2,
	L140 = 3,
}

export class CartLoginDTO {
  @IsNotEmpty()
  loginToken : string;

	//@IsNotEmpty()
	//cartID : string;
}

export interface ICartLoginResponse {
	status: string;
	// type: ClientType,
	name: string,
	currentAuthority: string,
	token: string,
	tokenExpirationTime: string,
}
