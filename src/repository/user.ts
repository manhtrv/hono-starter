import { eq } from 'drizzle-orm';
import { type NewUser, db } from '../db/database.js';
import { userSchema } from '../db/schema/schema.js';

export class UserRepository {
  public async create(user: NewUser) {
    return db.insert(userSchema).values(user);
  }

  public async find(id: number) {
    return db.query.userSchema.findFirst({
      where: eq(userSchema.id, id),
    });
  }

  public async findByEmail(email: string) {
    return db.query.userSchema.findFirst({
      where: eq(userSchema.email, email),
    });
  }
}
