import {Entity, hasMany, model, property} from '@loopback/repository';
import {Account} from './index';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string; 

  @property({
    type: 'string',
    required: true,
  })
  last_name: string; 

  @property({
    type: 'string',
    required: true,
    unique: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone_number?: string; 

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  @hasMany(() => Account, {keyTo: 'user_id'}) 
  accounts: Account[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {}

export type UserWithRelations = User & UserRelations;
