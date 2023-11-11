import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Project } from 'src/project/project.interface';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getProjects(): Promise<any[]> {
    return this.payments.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserProjects(@Param('id') id: string): Promise<any[]> {
    return this.payments.findById(id);
  }
}
