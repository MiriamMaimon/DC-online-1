import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration, { IAppConfig } from './config/configuration';
import { UserModule } from './modules/user.module';
import { UserRolesModule } from './modules/user-roles.module';
import { MonitorModule } from './modules/monitor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchModule } from './modules/branch.module';
import { ChainModule } from './modules/chain.module';
import { AzureADModule } from './modules/azure-ad.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			load: [configuration],
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const dbConfig = configService.get<IAppConfig>('appConfig');
				const { database: {
					user, password, port, db, server 
				} } = dbConfig;
				const usePassProtected = !!user && !!password;
				const uri = `mongodb://${usePassProtected ? `${user}:${password}@` : ''}${server}:${port}`;


				return {
					uri,
					useNewUrlParser: true,
					dbName: db,
					serverSelectionTimeoutMS: 5000,
				};
			},
			inject: [ConfigService],
		}),
		UserModule,
		UserRolesModule,
		MonitorModule,
		AuthModule,
		ChainModule,
		AzureADModule,
		BranchModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
