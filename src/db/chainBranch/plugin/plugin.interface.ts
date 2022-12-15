
export interface IPlugin {
	name: string,
	type: PluginType,
	enable: boolean,
	params: {[key: string] : string}
}


export enum PluginType {
	A = 1,
	B = 2,
	C = 3,
}