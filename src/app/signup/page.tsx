import SignupForm from "@ui/auth/signup-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const SignupPage = async () => {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/");
  }

  return <SignupForm />;
};

export default SignupPage;
