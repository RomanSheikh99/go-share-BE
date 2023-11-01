import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { projectProviders } from './project.providers';
import { ProjectService } from './project.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService,...projectProviders ]
})
export class ProjectModule {}
