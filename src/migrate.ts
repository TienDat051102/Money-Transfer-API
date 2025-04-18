import {MoneyTransferApiApplication} from './application';
import {AccountRepository, UserRepository} from './repositories';
import {Account, User} from './models';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new MoneyTransferApiApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  const userRepo = await app.getRepository(UserRepository);
  const accountRepo = await app.getRepository(AccountRepository);
  const user1 = await userRepo.create({
    first_name: 'Dao',
    last_name: 'Van Dat',
    email: 'a@example.com',
    phone_number: '0123456789',
  });

  const user2 = await userRepo.create({
    first_name: 'Dao',
    last_name: 'Tien Dat',
    email: 'b@example.com',
    phone_number: '0987654321',
  });

  await accountRepo.create({
    user_id: user1.id!,
    currency_code: 'VND',
    balance: 5000000,
  });

  await accountRepo.create({
    user_id: user2.id!,
    currency_code: 'VND',
    balance: 3000000,
  });

  console.log('Migration and seeding complete.');
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
