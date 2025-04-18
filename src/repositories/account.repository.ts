import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Account, AccountRelations, User} from '../models';
import { UserRepository } from './index';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {
  public readonly user: BelongsToAccessor<
  User,
  typeof Account.prototype.id
>;
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Account, dataSource);
    this.user = this.createBelongsToAccessorFor('userInfo', userRepositoryGetter);
    this.registerInclusionResolver('userInfo', this.user.inclusionResolver);
  }
}
