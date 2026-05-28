import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorksService } from '../../services/works/works.service';
import Works from '../../models/Works';
import { CreateWorksDTO } from '../../dto/works-dto/create-works-dto';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  findAll(): Promise<Works[]> {
    return this.worksService.findAll();
  }

  @Post()
  create(@Body() data: CreateWorksDTO){
    return this.worksService.create(data);
  }

}
