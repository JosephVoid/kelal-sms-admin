export interface IAppCard {
  name: string;
  appId: string;
}

export type Status = "sent" | "failed" | "pending" | "delivered";

export interface IBalanceCard {
  balance: number;
}
