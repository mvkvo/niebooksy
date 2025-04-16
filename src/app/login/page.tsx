import LoginForm from "@ui/auth/login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const LoginPage = async () => {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
};

export default LoginPage;
