import * as bcrypt from 'bcrypt';

export class Hash {
  static make(plainText: string | Buffer): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
