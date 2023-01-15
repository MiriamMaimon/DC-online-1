import { PluginType } from "./plugin.interface";

export class PluginDTO{
	readonly type:PluginType = PluginType.A;
	readonly name: string;
	readonly params:{[key: string] : string};

}


