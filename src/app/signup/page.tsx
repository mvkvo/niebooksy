import SignupForm from "@/components/auth/signup-form";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignupForm />;
}
