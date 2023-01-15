
import { TagDTO } from "../chainBranch/tag/tag.dto";
import { PluginDTO } from "../chainBranch/plugin/plugin.dto";
import { Types } from "mongoose";

export class CreateBranchDTO {
	readonly name: string;
	readonly address?: string;
	readonly city?: string;
	readonly phone?: string;
	readonly logo?: string;
	readonly tag?: TagDTO[];
	readonly plugin?: PluginDTO[];
	readonly langauges?: string[];
	readonly weightAllowedDelta?: number;
	readonly weightUpdateInterval?: number;
	readonly weightUpdateJob?: boolean;
	chain: string | Types.ObjectId;
    
}
