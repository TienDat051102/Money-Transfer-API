import {belongsTo, Entity, model, property} from '@loopback/repository';
import { User } from './index';

@model()
export class Account extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User, {name: 'userInfo'})
  user_id: number;

  @property({
    type: 'string',
    jsonSchema: {
        enum: ['USD', 'EUR','VND'],
      },
    required: true,
  })
  currency_code: string;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
    userInfo?: User; 
}

export type AccountWithRelations = Account & AccountRelations;
