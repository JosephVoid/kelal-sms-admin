export interface IKeys {
  id: string;
  name: string;
  keyHash: string;
  lastUsed?: Date | null;
  expiresOn: Date;
}
