import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Works from '../../models/Works';
import IWorks from '../../interfacec/IWorks';
import { CreateWorksDTO } from '../../dto/works-dto/create-works-dto';
import IServerMessage from '../../interfacec/IServerMessage';
import { FindOptions } from 'sequelize';
@Injectable()
export class WorksService {
  constructor(
    @InjectModel(Works)
    private worksModel: typeof Works,
  ) {}
  async findAll(
    page: number = 1,
    pageSize: number = 10,
    state: number | undefined,
    workTypesID: number | undefined,
  ): Promise<Works[]> {
    Logger.log(`Страница ${page}, размер стр. ${pageSize}`);
    const filters: FindOptions<Works> = { include: ['workType'] };
    if (pageSize) {
      const _page = page - 1;
      filters.offset = _page * pageSize;
      filters.limit = pageSize;
    }
    if (typeof state !== 'undefined') {
      Logger.log(`Состояние ${state}`);
      filters.where = { state: +state };
    }
    if (typeof workTypesID !== 'undefined') {
      if (filters.where) {
        filters.where = { ...filters.where, ...{ workTypesID: +workTypesID } };
      } else {
        filters.where = { workTypesID: +workTypesID };
      }
    }
    console.log(filters);
    return this.worksModel.findAll(filters);
  }
  async create(data: CreateWorksDTO): Promise<IWorks> {
    return new Promise<IWorks>(async (resolve, reject) => {
      try {
        const model = await this.worksModel.create(data);
        resolve(model.toJSON());
      } catch (err) {
        Logger.error('Ошибка BD.');
        console.log(err);
        reject(new HttpException('Ошибка BD.', HttpStatus.BAD_REQUEST));
      }
    });
  }

  async deleteOne(id: number): Promise<IServerMessage> {
    return new Promise<IServerMessage>(async (resolve) => {
      const count = await this.worksModel.destroy({ where: { id: id } });
      resolve({
        message: `Удалено ${count} запись(и).`,
      });
    });
  }

  async update(id: number, data: CreateWorksDTO): Promise<IServerMessage> {
    return new Promise<IServerMessage>(async (resolve, reject) => {
      const model = await this.worksModel.findOne({ where: { id: id } });
      if (model) {
        let count: number = 0;
        try {
          const [affectedCount] = await this.worksModel.update(data, {
            where: { id: id },
          });
          count = affectedCount;
          console.log(count);
        } catch (err) {
          Logger.error('Ошибка BD.');
          console.log(err);
          reject(new HttpException('Ошибка BD.', HttpStatus.BAD_REQUEST));
        }
        resolve({
          message: `Обновлено ${count} запись(и).`,
        });
      } else {
        reject(new HttpException('Запись не найдена.', HttpStatus.BAD_REQUEST));
      }
    });
  }
  async findOne(id: number): Promise<IWorks> {
    return new Promise<IWorks>(async (resolve, reject) => {
      const model = await this.worksModel.findOne({ where: { id: id } });
      if (model) {
        resolve(model.toJSON());
      } else {
        reject(new HttpException('Запись не найдена', HttpStatus.NOT_FOUND));
      }
    });
  }
}
