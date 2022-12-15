import { IDefault } from "../default/default.interface";

export interface IUserRole extends  IDefault {
	readonly name: string;
	readonly permissions?: string[];
}



