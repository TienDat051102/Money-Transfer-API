import {Entity, model, property} from '@loopback/repository';

@model()
export class Transaction extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  from_account_id: number;

  @property({
    type: 'number',
    required: true,
  })
  to_account_id: number; 

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  transaction_date?: string; 

  @property({
    type: 'string',
    jsonSchema: {
        enum: ['pending', 'completed', 'failed'],
      },
    default: 'completed',
  })
  status?: string; 


  @property({
    type: 'string',
  })
  content?: string;
   
  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {}

export type TransactionWithRelations = Transaction & TransactionRelations;
