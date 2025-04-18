import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Transaction, TransactionRelations} from '../models';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.id,
  TransactionRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Transaction, dataSource);
  }
}
