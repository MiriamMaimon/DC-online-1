import { logger } from '@c2m/c2m-logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AzureEdgeStrategy } from './services/auth/azure-edge.strategy';

async function bootstrap():Promise<void> {


	logger.setConfig({
		PROJECT_NAME: 'dc-online',
		LOG_LEVEL: 'info',
	}, true);
		
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api/v1');
	await app.listen(783);
	const config = await app.get<ConfigService>(ConfigService);

	app.useGlobalGuards(new AzureEdgeStrategy(config));

	logger.info(`dc-online is running on: ${await app.getUrl()}`);
}
bootstrap();