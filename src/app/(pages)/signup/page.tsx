import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import SignupForm from "@/components/features/auth/signup-form";

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/");

  return <SignupForm />;
}
