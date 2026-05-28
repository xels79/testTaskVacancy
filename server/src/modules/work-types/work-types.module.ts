import { Module } from '@nestjs/common';
import { WorkTypesController } from '../../controllers/work-types/work-types.controller';
import { WorkTypesService } from '../../services/work-types/work-types.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTypes } from '../../models/WorkTypes';
import Works from '../../models/Works';

@Module({
    imports: [SequelizeModule.forFeature([WorkTypes, Works])],
    controllers:[WorkTypesController],
    providers:[WorkTypesService],
})
export class WorkTypesModule {}
