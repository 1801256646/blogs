import { Repository, QueryRunner } from 'typeorm';

export class TypeormHelperService<T> {
  constructor(private readonly repository: Repository<T>) {}

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }
}
