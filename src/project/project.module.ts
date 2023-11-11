import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { projectProviders } from './project.providers';
import { ProjectService } from './project.service';
import { DatabaseModule } from 'src/database/database.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [DatabaseModule, PaymentsModule],
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders],
})
export class ProjectModule {}
