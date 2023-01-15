import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonitorController } from '../controllers/monitor.controller';
import { Connection } from 'mongoose';
import { CartModule } from '../modules/cart.module'
import { UserModule } from './user.module';
import { monitorUpdatesSchema } from '../db/monitorUpdates/monitorUpdates.schema';
import { cartsMonitorSchema } from '../db/monitor/cartsMonitor/cartsMonitor.schema';
import { MonitorService } from 'src/services/monitor.service';

@Module({
  imports: [
    CartModule,
    UserModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'CartsMonitor',
        collection: 'cartsMonitor',
        useFactory: async (connection: Connection) => {
          const schema = cartsMonitorSchema;
          return schema;
        }
      },
      {
        name: 'MonitorUpdates',
        collection: 'monitorUpdates',
        useFactory: async (connection: Connection) => {
          const schema = monitorUpdatesSchema;
          return schema;
        }
      },
    ]),
  ],
  controllers: [MonitorController],
   providers: [MonitorService],
   exports: [MonitorService]
})
export class MonitorModule { }


