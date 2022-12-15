//import { Types } from "mongoose";
import { ClientType } from "./connection";

export interface ICredentials {
	token: string
	type: ClientType/*.Edge | ClientType.Cart*/
	name?:string,
}

export interface IUserCredentials{
	username:string,
	password:string,
}