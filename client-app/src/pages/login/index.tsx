import Login from "../../app/layout/Login";
import LoginForm from "../../app/components/Forms/LoginForm";

export default function LoginPage() {
  return (
    <Login
      Form={LoginForm}
      href="/register"
      title="Sign in to your account"
      subTitle="register now for free"
    />
  );
}
