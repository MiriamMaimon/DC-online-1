import { registerAs } from "@nestjs/config";

import * as defultSettings from './settings.default.json';

interface IDatabaseConfig {
	server: string,
	port: number,
	db: string,
	user?: string | null,
	password?: string | null,
}

interface IAzureConfig {
	dcuiClientID: string,
    
	dcmClientID: string,
	dcmClientSecret: string,
    
	edgeClientID: string,
	edgeClientSecret: string,
    
	c2m360ControlMetadata: string,
	c2m360ControlIssuer: string,
	c2m360ControlAuthority: string,
	c2m360ControlDomain: string // currently this is c2m360control.onmicrosoft.com but whenever we add verified domains we can change it/ add those here

	graphUserEndpoint: string,
	graphDefaultScope: string,

	jwtLoggingLevel: string // error | warn | info 

}


export interface IQrCodeJwtConfig {
	secret: string,
	expiresIn: string | number
}

export interface IAppConfig {
	name: string,
	id: string,
	ip: string,
	port: number,
	setupId: string,
	privateKey: string,
	publicKey: string,
	jwtPublicKey: string,
	tokenExpirationTime: string,
	database: IDatabaseConfig,
	c2mCdnHost: string,
	c2mCdnSasToken: string,
	vapidPublicKey: string,
	vapidPrivateKey: string,
	webPushContact: string,
	notificationLang: string,
	c2mcdnAccessKey:string
	c2mContainerName: string
	azure: IAzureConfig,
	qrCodeJwtConfig: IQrCodeJwtConfig,
	superAdminPassword: string

}

export default registerAs('appConfig', (): IAppConfig => ({
	name: process.env.DATACENTER_NAME,
	id: process.env.DATACENTER_ID,
	ip: defultSettings.ip,
	port: parseInt(process.env.DATACENTER_PORT, 10),
	setupId: process.env.DATACENTER_SETUP_ID,
    
	vapidPublicKey: process.env.PUBLIC_VAPID_KEY,
	vapidPrivateKey: process.env.PRIVATE_VAPID_KEY,
	webPushContact: process.env.WEB_PUSH_CONTACT,
	notificationLang: process.env.NOTIFICATION_LANG,
	c2mcdnAccessKey: process.env.C2M_CDN_ACCESS_KEY,
	c2mContainerName: process.env.C2M_CONTAINER_NAME,
	privateKey: 'F080A4EB17994CFDB42847F6',
	publicKey: process.env.DATACENTER_PUBLIC_KEY,
	jwtPublicKey: process.env.DATACENTER_JWT_PUBLIC_KEY,
	tokenExpirationTime: process.env.TOKEN_EXP_TIME || defultSettings.tokenExpirationTime,
	database: {
		server: process.env.DATABASE_SERVER || defultSettings.database.server,
		port: parseInt(process.env.DATABASE_PORT || `${defultSettings.database.port}`, 10),
		db: process.env.DATABASE_NAME || defultSettings.database.db,
		user: process.env.DATABASE_USERNAME || defultSettings.database.user,
		password: process.env.DATABASE_PASSWORD || defultSettings.database.password,
	},
	qrCodeJwtConfig: {
		secret: process.env.QR_CODE_JWT_SECRET,
		expiresIn: process.env.QR_CODE_JWT_EXPIRES_IN,
	},
	c2mCdnHost: process.env.C2M_CDN_HOST || defultSettings.c2mCdnHost,
	c2mCdnSasToken: process.env.C2M_CDN_SAS_TOKEN || defultSettings.c2mCdnSasToken,

	azure: {
		dcuiClientID: process.env.AAD_DCUI_CLIENT_ID,
		dcmClientID: process.env.AAD_DCM_CLIENT_ID,
		dcmClientSecret: process.env.AAD_DCM_CLIENT_SECRET,
		edgeClientID: process.env.AAD_EDGE_CLIENT_ID,
		edgeClientSecret: process.env.AAD_EDGE_CLIENT_SECRET,
        
		c2m360ControlMetadata: process.env.AAD_360CONTROL_METADATA,
		c2m360ControlIssuer: `https://sts.windows.net/${process.env.AAD_360CONTROL_TENANT_ID}/`,
		c2m360ControlAuthority: `https://login.microsoftonline.com/${process.env.AAD_360CONTROL_TENANT_ID}`,
		c2m360ControlDomain: process.env.AAD_360CONTROL_DOMAIN,
        
		graphUserEndpoint: `${process.env.MS_GRAPH_ENDPOINT}/v1.0/users`,
		graphDefaultScope: process.env.MS_GRAPH_DEFAULT_SCOPE,

		jwtLoggingLevel:process.env.JWT_LOGGING_LEVEL || "error"
	},
	superAdminPassword : process.env.SUPER_ADMIN_PASSWORD ,
}));