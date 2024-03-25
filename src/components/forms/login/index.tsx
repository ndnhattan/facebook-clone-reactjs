import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postLoginUser } from '../../../utils/api';
import { SocketContext } from '../../../utils/context/SocketContext';
import { UserCredentialsParams } from '../../../utils/types';
import { Modal } from '../../modals/Modal';
import { RegisterForm } from '../register';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialsParams>();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: UserCredentialsParams) => {
    console.log(socket);
    console.log(socket.connected);
    try {
      const { accessToken, refreshToken } = await postLoginUser(data);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

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
    <div className="w-[410px] mt-12 bg-white rounded-lg shadow-lg p-3 flex flex-col items-center">
      {showModal && (
        <Modal>
          <RegisterForm setShowModal={setShowModal} />
        </Modal>
      )}
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border rounded-lg px-4 py-3 w-full outline-none"
          type="text"
          id="email"
          placeholder="Email address"
          {...register('email', { required: true })}
        />

        <input
          className="border rounded-lg px-4 py-3 w-full outline-none mt-3"
          placeholder="Password"
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        <button className=" w-full rounded-lg py-3 mt-4 bg-primary-blue text-white font-bold text-xl">
          Log in
        </button>
      </form>
      <Link
        to="/forgot-password"
        className="text-sm text-primary-blue mt-3 font-medium"
      >
        Forgotten password?
      </Link>
      <hr className="w-full my-6 border-[#dadde1] border-t" />
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#42b72a] text-white font-bold rounded px-4 py-3 mb-2"
      >
        Create new account
      </button>
    </div>
  );
};
