import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../../utils/api';
import { SocketContext } from '../../../utils/context/SocketContext';
import { UserCredentialsParams } from '../../../utils/types';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialsParams>();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onSubmit = async (data: UserCredentialsParams) => {
    console.log(socket);
    console.log(socket.connected);
    try {
      await postLoginUser(data);
      console.log('Success');
      socket.connect();
      console.log(socket.connected);
      navigate('/conversations');
    } catch (err) {
      console.log(socket.connected);
      console.log(err);
    }
  };

  return (
    <form className="w-[800px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#131313] px-4 py-3 rounded-[10px]">
        <label htmlFor="username" className="text-[#8f8f8f] my-1 text-sm">
          Username
        </label>
        <input
          className="text-lg font-medium my-1 w-full bg-inherit outline-none"
          type="text"
          id="username"
          {...register('username', { required: true })}
        />
      </div>
      <div className="bg-[#131313] px-4 py-3 rounded-[10px] my-2">
        <label htmlFor="password" className="text-[#8f8f8f] my-1 text-sm">
          Password
        </label>
        <input
          className="text-lg font-medium my-1 w-full bg-inherit outline-none"
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
      </div>
      <button
        className="my-[8px] bg-[#2b09ff] w-full py-[25px] rounded-[10px] text-base font-medium
      transition-colors hover:bg-[#3415ff]"
      >
        Login
      </button>
      <div className="mx-auto mt-[10px] text-center">
        <span>Don't have an account? </span>
        <Link to="/register">
          <span className="underline text-[#b8b8b8]">Register</span>
        </Link>
      </div>
    </form>
  );
};
