import Login from "../../app/layout/Login";
import RegisterForm from "../../app/components/Forms/RegisterForm";

export default function RegisterPage() {
  return (
    <Login
      Form={RegisterForm}
      title="Sign up for growlab"
      subTitle="already have an account?"
      href="/login"
    />
  );
}
