import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Connection } from 'mongoose';
import { PaymentSchema } from './payments.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,
    {
      provide: 'PAYMENT_MODEL',
      useFactory: (connection: Connection) => connection.model('Payment', PaymentSchema),
      inject: ['DATABASE_CONNECTION'],
    }],
  imports: [DatabaseModule],
  exports: [PaymentsService]

})
export class PaymentsModule { }
