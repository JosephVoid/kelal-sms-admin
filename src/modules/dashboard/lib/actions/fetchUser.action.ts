import { getUser } from "../db";

export default async function fetchUserAction(userId: string) {
  return await getUser(userId);
}
