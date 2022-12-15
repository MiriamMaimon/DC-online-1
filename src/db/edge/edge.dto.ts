import { Types } from "mongoose";

export class CreateEdgeDTO {
	readonly name?: string;
	//readonly loginToken?: string;
	readonly dataCenterSetupId: string;
	readonly ip?: string;
	readonly port?: number;
	branches?: (string | Types.ObjectId)[];
	chains?: (string | Types.ObjectId)[];
}  