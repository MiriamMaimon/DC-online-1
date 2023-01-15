import { TagDTO } from "../chainBranch/tag/tag.dto";
import { PluginDTO } from "../chainBranch/plugin/plugin.dto";
import { Schema } from "mongoose";

export class CreateChainDTO {
	//@ApiProperty()
	readonly name: string;
	readonly dataCenterId?: Schema.Types.ObjectId;
	readonly syncMainDataCenter?: boolean;
	readonly address?: string;
	readonly city?: string;
	readonly phone?: string;
	readonly logo?: string;
	readonly tag?: TagDTO[];
	readonly plugin?: PluginDTO[];
	readonly ip?: string;
	readonly port?: number;
	readonly langauges?: string[];
	readonly weightAllowedDelta?: number;
	readonly weightUpdateInterval?: number;
	readonly weightUpdateJob?: boolean;
    
}
