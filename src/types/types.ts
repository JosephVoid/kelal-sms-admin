export type ServerActionResponse = Promise<{
  success: boolean;
  error?: string;
  [key: string]: any;
}>;
