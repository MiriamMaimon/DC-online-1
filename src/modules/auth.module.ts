import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AzureEdgeStrategy } from "src/services/auth/azure-edge.strategy";



@Module({
	imports: [],
	controllers: [],
	providers: [
		AzureEdgeStrategy,
		/* 
    Below setting sets a global auth standard that will make it necessary to preceede it with the Public decorator in order to 
    use multiple strategies per controller or route and therefore should be delete eventually. We then need to provide for each route/controller 
    a standard auth strategy otherwise the nedpoints will be unprotected!
    */ 
		{
			provide: APP_GUARD,
			useClass: AzureEdgeStrategy
		}
	],
	exports: [AzureEdgeStrategy  ],
})
export class AuthModule { }