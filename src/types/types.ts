export type ServerActionResponse = Promise<{
  success: boolean;
  error?: string;
}>;
