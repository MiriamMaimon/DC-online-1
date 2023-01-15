import { Types } from "mongoose";
import { CartDimension, CartType } from "./cart.interface";

export class CreateCartDTO {
	readonly name?: string;
	readonly branchSetupId: string;
	type: CartType = CartType.ShopingCart;
	dimension: CartDimension = CartDimension.L300;
	readonly ip?: string;
	branchId: Types.ObjectId;
	cartNumber?: number;
}


export class CartSetupDTO   {
	readonly branchSetupId: string;
	branchId:string | Types.ObjectId;
}
  


