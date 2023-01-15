import { logger } from '@c2m/c2m-logger';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartsMonitorDocument } from 'src/db/monitor/cartsMonitor/cartsMonitor.schema';
import { IMonitorUpdates } from 'src/db/monitorUpdates/monitorUpdates.interface';
import { MonitorUpdatesDocument } from 'src/db/monitorUpdates/monitorUpdates.schema';

@Injectable()
export class MonitorService {
	constructor(@InjectModel('CartsMonitor') private readonly cartsMonitorModel: Model<CartsMonitorDocument>,
		@InjectModel('MonitorUpdates')
		private readonly monitorUpdatesModel: Model<MonitorUpdatesDocument>) { }

	createMonitorUpdate(data: IMonitorUpdates):any {
		try {
			logger.debug('IMonitorUpdates data {0}',data)
			this.monitorUpdatesModel.create(data);
		}
		catch (error) {
			logger.error('createMonitorUpdate error', error);
		}
	}

	async updateCartMonitor(data: IMonitorUpdates) :Promise<void>{
		const newUpdate: Record<string, any> =
            data.type === 'lastPing'
            	? { lastPing: new Date(data.data["sendDate"]) }
            	: { [data.type]: data.data,
            		lastPing: new Date(data.data["sendDate"]) };

		try {
			await this.cartsMonitorModel.updateOne(
				{ cartID: data.cartID },
				newUpdate,
				{ upsert: true },
			);
		}
		catch (error) {
			logger.error('updateCartMonitor error', error);
		}
	}
}

