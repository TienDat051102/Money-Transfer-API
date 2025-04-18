import {post, requestBody, response} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {
  AccountRepository,
  TransactionRepository,
  UserRepository,
} from '../repositories';
import {Transaction} from '../models';
import {HttpErrors} from '@loopback/rest';

export class MoneyTransferController {
  constructor(
    @repository(AccountRepository)
    public accountRepo: AccountRepository,

    @repository(TransactionRepository)
    public transactionRepo: TransactionRepository,

    @repository(UserRepository)
    public userRepo: UserRepository,
  ) {}

  @post('/transfer')
  @response(200, {
    description: 'Transfer money',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async transferMoney(
    @requestBody({
      description: 'Chi tiet giao dich',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              fromAccountId: {type: 'number'},
              toAccountId: {type: 'number'},
              amount: {type: 'number'},
            },
            required: ['fromAccountId', 'toAccountId', 'amount'],
          },
        },
      },
    })
    transferDetails: {
      fromAccountId: number;
      toAccountId: number;
      amount: number;
    },
  ): Promise<any> {
    const {fromAccountId, toAccountId, amount} = transferDetails;

    console.log('transferDetails', transferDetails);
    if (amount <= 0) {
      throw new HttpErrors.BadRequest(
        'Transaction amount must be greater than 0',
      );
    }
    if (toAccountId == fromAccountId) {
      throw new HttpErrors.BadRequest('Cannot trade in the same account');
    }
    try {
      let fromAccount = await this.accountRepo.findById(fromAccountId, {
        include: ['userInfo'],
      });
      let toAccount = await this.accountRepo.findById(toAccountId);
      if (fromAccount) {
        console.log('test');
        if (!toAccount) {
          throw new HttpErrors.BadRequest('Recipient information not found');
        }

        if (fromAccount.currency_code !== toAccount.currency_code) {
          throw new HttpErrors.BadRequest(
            'Ensure both accounts use the same currency for transactions',
          );
        }

        if (fromAccount.balance < amount) {
          throw new HttpErrors.BadRequest('Insufficient balance');
        }

        fromAccount.balance -= amount;
        toAccount.balance += amount;
        const {userInfo, ...accountData} = fromAccount;

        await this.accountRepo.updateById(
          fromAccount.id,
          accountData,
        );
        await this.accountRepo.updateById(toAccount.id, toAccount);

        const senderName =
          fromAccount.userInfo?.first_name +
          ' ' +
          fromAccount.userInfo?.last_name;

        console.log('senderName', senderName);

        const content = `${senderName} đã chuyển khoản`;

        const transaction = new Transaction({
          from_account_id: fromAccountId,
          to_account_id: toAccountId,
          amount: amount,
          transaction_date: new Date().toISOString(),
          status: 'completed',
          content: content,
        });
        console.log('transaction', transaction);
        await this.transactionRepo.create(transaction);

        return 'Success';
      } else {
        return 'Internal server Error Occurred, Please try again';
      }
    } catch (e) {
      return {error: `Internal server Error Occurred, Please try again`, e};
    }
  }
}
