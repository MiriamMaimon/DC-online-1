import { Body, Controller, Post } from '@nestjs/common';
import { IMonitorUpdates } from 'src/db/monitorUpdates/monitorUpdates.interface';
import { MonitorService } from 'src/services/monitor.service';
import * as _ from 'lodash';

@Controller('monitor')
export class MonitorController {
	constructor(private monitorService: MonitorService) { }
	@Post()
	public async cartStatus(@Body() data: any):Promise<IMonitorUpdates> {
		if (_.isArray(data)) {
			data.map((dataType: IMonitorUpdates) => {
				// Allthough we receive a timestamp from the cart-system-monitoring service,
				//  we want to create the timestamp from the data-center-manager, as close to the db as possible.
				dataType.time = new Date();
				if (dataType.type !== 'lastPing') {
					this.monitorService.createMonitorUpdate(dataType);
				}

				this.monitorService.updateCartMonitor(dataType);
			});
		}

		return data;
	}


}
