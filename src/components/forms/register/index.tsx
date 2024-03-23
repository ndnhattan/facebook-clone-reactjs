import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postRegisterUser } from '../../../utils/api';
import { CreateUserParams } from '../../../utils/types';
import { toast } from 'react-toastify';
import { UsernameField } from './UsernameField';
import { NameField } from './NameField';
import { PasswordField } from './PasswordField';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserParams>({ reValidateMode: 'onBlur' });

  const navigate = useNavigate();
  const onSubmit = async (data: CreateUserParams) => {
    console.log(data);
    try {
      await postRegisterUser(data);
      navigate('/login');
      toast.clearWaitingQueue();
      toast('Account created!', { type: 'success', icon: true });
    } catch (err) {
      console.log(err);
      toast.clearWaitingQueue();
      toast('Error creating user', { type: 'error', icon: true });
    }
  };

  const formFieldProps = { errors, register };

  return (
    <form className="w-[800px]" onSubmit={handleSubmit(onSubmit)}>
      <UsernameField {...formFieldProps} />
      <NameField {...formFieldProps} />
      <PasswordField {...formFieldProps} />
      <button
        className="my-[8px] bg-[#2b09ff] w-full py-[25px] rounded-[10px] text-base font-medium
      transition-colors hover:bg-[#3415ff]"
      >
        Create My Account
      </button>
      <div className="mx-auto mt-[10px] text-center">
        <span>Already have an account? </span>
        <Link to="/login">
          <span className="underline text-[#b8b8b8]">Login</span>
        </Link>
      </div>
    </form>
  );
};
