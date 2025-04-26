import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
