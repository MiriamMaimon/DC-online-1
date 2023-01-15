import { CartComponentType } from "./cartComponent.interface";


export class CreateCartComponentDTO {
	readonly name: string;
	readonly type: CartComponentType;
	readonly ip?: string;
	readonly port?: number;
}


