import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTypes } from './models/WorkTypes';
import { WorkTypesModule } from './modules/work-types/work-types.module';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './data/database.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [WorkTypes]
    }),
    WorkTypesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
