import { PassportStrategy } from '@nestjs/passport';
import { Injectable, /*ExecutionContext*/} from '@nestjs/common';
import { BearerStrategy } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '../../config/configuration';
import { Observable } from 'rxjs';

@Injectable()
export class AzureEdgeStrategy extends PassportStrategy(BearerStrategy, 'azure-edge') {
	constructor(
		readonly configService: ConfigService
	) {
		console.log('configService',configService.get('appConfig'));
        
		super({
			identityMetadata: (configService.get<IAppConfig>('appConfig') ?? {} as IAppConfig).azure.c2m360ControlMetadata,
			clientID: (configService.get<IAppConfig>('appConfig') ?? {} as IAppConfig).azure.edgeClientID,
			issuer: (configService.get<IAppConfig>('appConfig') ?? {} as IAppConfig).azure.c2m360ControlIssuer,
			loggingLevel: (configService.get<IAppConfig>('appConfig') ?? {} as IAppConfig).azure.jwtLoggingLevel, // optional log level
			loggingNoPII: false // optional do not log sensitive information
		});
        
	}
	canActivate(
	// context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return true;
	}
	async validate(response: any) : Promise<{edgeOid: any;}>{         
		if (response) {
			return {edgeOid: response.oid};
		}
		else return null;
	}
  
}

    

    