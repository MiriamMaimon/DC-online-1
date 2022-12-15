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
			// console.log('createMonitorUpdate');
			this.monitorUpdatesModel.create(data);
		}
		catch (error) {
			console.error('createMonitorUpdate error', error);
		}
	}

	async updateCartMonitor(data: IMonitorUpdates) :Promise<void>{
		// console.log('updateCartMonitor-----', data.data, (data.type === 'lastPing'));
		const newUpdate: Record<string, any> =
            data.type === 'lastPing'
            	? { lastPing: new Date(data.data["sendDate"]) }
            	: { [data.type]: data.data,
            		lastPing: new Date(data.data["sendDate"]) };

		console.log('newUpdate', newUpdate);
		try {
			await this.cartsMonitorModel.updateOne(
				{ cartID: data.cartID },
				newUpdate,
				{ upsert: true },
			);
		}
		catch (error) {
			console.error('updateCartMonitor error', error);
		}
	}
}

