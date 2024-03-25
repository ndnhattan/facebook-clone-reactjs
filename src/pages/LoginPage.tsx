import { LoginForm } from '../components/forms/login';

export const LoginPage = () => {
  return (
    <div className="flex mx-auto max-w-5xl pt-20">
      <div className="flex-1 pt-28 px-4">
        <h1 className="text-primary-blue font-bold text-6xl">facebook</h1>
        <p className="text-2xl font-normal mt-3">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};
