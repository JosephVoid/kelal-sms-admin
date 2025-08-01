import { getUserDetail } from "../db";

export default async function fetchUserDetailAction(userId: string) {
  const result = await getUserDetail(userId);
  if (!result) return null;

  const { password, ...theRest } = result;
  return theRest;
}
