import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'pgdb',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: '',
};

@lifeCycleObserver('datasource')
export class PgdbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pgdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pgdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
