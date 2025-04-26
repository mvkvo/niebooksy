import SignupForm from "@/components/auth/signup-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/");
  }

  return <SignupForm />;
}
