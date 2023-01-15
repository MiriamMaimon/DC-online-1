export interface ICartRequest {
	cartName: string,
	cartClientNumber: number,
	cartClientId: string,
	edgeName: string,
	edgeClientNumber: number,
	edgeClientId: string,
	createDate: Date,
	state: string | 'real-time' | 'late-bind' | 'disconnect-bind',
	data: object
}