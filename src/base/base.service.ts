import { Brackets, ObjectLiteral, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ListParamsDto } from './dto/list-params.dto';
import { ListDto } from './dto/list.dto';

export abstract class BaseService<T extends BaseEntity> {
  repository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async list(listParamsDto: ListParamsDto) {
    const array = await this.repository
      .createQueryBuilder()
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(listParamsDto.getOrderedField(), listParamsDto.order)
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();
    return new ListDto(array, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async get(id: number): Promise<T | null> {
    return this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async listBy(
    where: string | ObjectLiteral | Brackets,
    listParamsDto: ListParamsDto,
  ): Promise<ListDto<T>> {
    const array = await this.repository
      .createQueryBuilder()
      .where(where)
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(listParamsDto.getOrderedField(), listParamsDto.order)
      .getMany();
    const itemsCount = await this.repository
      .createQueryBuilder()
      .where(where)
      .getCount();
    return new ListDto<T>(array, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  deleteBy(where: string | ObjectLiteral | Brackets) {
    return this.repository.createQueryBuilder().where(where).delete();
  }
}
