import { Types } from "mongoose";
import { Socket } from "socket.io";

export interface IConnection {
	clientType: ClientType;
	clientName: string;
	clientId: Types.ObjectId;
	clientIp:string;
	clientPort:number;
	serverType: ClientType;
	serverName: string;
	serverId: Types.ObjectId;
	serverIp:string;
	serverPort:number;
	socketNumber: number;
	socketId: string;
	edgeToken?: string;
	cartToken?: string;
}

export interface IClientSocket {
	connection: IConnection,
	socket : Socket
}

export /*declare const*/ enum ClientType {
	DataCenter,
	Edge,
	Cart,
	Component,
	User,
}

