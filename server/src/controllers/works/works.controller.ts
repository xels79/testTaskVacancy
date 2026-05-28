import { Controller, Get } from '@nestjs/common';
import { WorksService } from '../../services/works/works.service';
import Works from '../../models/Works';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  findAll(): Promise<Works[]> {
    return this.worksService.findAll();
  }

}
