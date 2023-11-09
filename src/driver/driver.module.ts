import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './driver.schema';
import { Connection } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService,
    {
      provide: 'DRIVER_MODEL',
      useFactory: (connection: Connection) => connection.model('Driver', DriverSchema),
      inject: ['DATABASE_CONNECTION'],
    }],
  exports:[DriverService]
})
export class DriverModule {}
