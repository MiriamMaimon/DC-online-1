import { ITag } from '../chainBranch/tag/tag.interface';
import { IPlugin } from '../chainBranch/plugin/plugin.interface';


export interface IChainBranch  {
	name: string,
	logo?: string,
	weightAllowedDelta?: number,
	weightUpdateInterval?: number,
	weightUpdateJob?: boolean,
	tag?: ITag[],
	plugin?: IPlugin[],
	langauges?: string[],
}