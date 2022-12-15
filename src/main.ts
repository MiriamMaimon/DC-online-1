import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AzureEdgeStrategy } from './services/auth/azure-edge.strategy';

async function bootstrap():Promise<void> {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api/v1');
	await app.listen(783);
	const config = await app.get<ConfigService>(ConfigService);

	app.useGlobalGuards(new AzureEdgeStrategy(config));

	console.log('dc-online is running');
  
}

bootstrap();
