import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTypes } from '../../models/WorkTypes';
import Works from '../../models/Works';
import { WorksController } from '../../controllers/works/works.controller';
import { WorksService } from '../../services/works/works.service';

@Module({
    imports:[SequelizeModule.forFeature([WorkTypes, Works])],
    controllers:[WorksController],
    providers:[WorksService]
})
export class WorksModule {}
