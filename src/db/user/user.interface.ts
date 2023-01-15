import { Types } from "mongoose";
import { IAuthorization } from "../authorization/authorization.interface";
import { IDefault } from "../default/default.interface";
import { IBranch, IBranchPopulated } from "../branch/branch.interface";
import { IUserRole as IUserRoleRoot} from "../userRole/user-role.interface";


export interface IBranchesByRoles {
	allBranches: boolean;
	branchesIDs: string[] | Types.ObjectId[];
}
export interface IUserRole {
	roleID: IUserRoleRoot;
	branches: Types.ObjectId[];
}


export interface IUserBase extends IAuthorization, IDefault {
	firstName: string;
	lastName?: string;
	email: string;
	usertype: string;
	verified?: boolean;
	gender?: Gender;
	userId: number;
	userRoles?: IUserRole[];
	azureOid?: string;
	azureSub?: string;
	qrCodeToken?: string;
	allBranches?: boolean;
	externalUserID?: string | null,
	externalUserPassword?: string | null,
}

export interface IUserBelong {
	branches?: IBranch[];
}

export interface IUser extends IUserBase, IUserBelong {
	branchesIDs?: Types.ObjectId[] | string[];
	userPermissions?: string[];
	permissions?: string[];
}

export interface IQrUser {
	firstname: string,
	lastname: string,
	externalUserID: string | null,
	externalUserPassword: string | null,
	userRoles?: any
}

export interface IUserFilter {
	status?: number[] | null,
	id?: string | null
	branchesIDs?: Types.ObjectId[] | string[];
}

export interface IUserPopulated extends IUserBase {
	branches: [IBranchPopulated],
}

export const enum Gender {
	Male = 1,
	Female = 0
}