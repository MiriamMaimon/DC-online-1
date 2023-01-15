import { Types } from "mongoose";
import { Gender } from "./user.interface";

export class UserRolesDTO {
	roleID: Types.ObjectId;
	branches: any[];
}
export class CreateUserDTO {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string;
	usertype?: string;
	gender?: Gender;
	chains?: (string | Types.ObjectId)[];
	azureOid?: string;
	userRoles?: any;
	dateOfBirth?: Date | number;
	qrCodeToken?: string;
	userName?: string;
	active?: boolean;
}

export class UpdateUserDTO {
	firstName?: string;
	lastName?: string;
	username?: string;
	password?: string;
	email?: string;
	usertype?: string;
	gender?: Gender;
	chains?: (string | Types.ObjectId)[];
	azureOid?: string;
	userRoles?: any;
	qrCodeToken?: string;
	userName?: string;
	active?: boolean;
}
