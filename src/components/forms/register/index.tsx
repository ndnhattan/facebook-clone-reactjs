import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postRegisterUser } from '../../../utils/api';
import { CreateUserParams, Gender } from '../../../utils/types';
import { toast } from 'react-toastify';
import { EmailField } from './EmailField';
import { NameField } from './NameField';
import { PasswordField } from './PasswordField';
import { FC } from 'react';
import { Cross, QuestionFill } from 'akar-icons';
import { DAY_ARR, MONTH_ARR, YEAR_ARR } from '../../../utils/constants';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterForm: FC<Props> = ({ setShowModal }) => {
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
    <div className="w-[420px] bg-white rounded-lg shadow-lg py-3 flex flex-col items-center">
      <div className="flex justify-between w-full px-4">
        <div className="">
          <h3 className="text-3xl font-bold">Sign Up</h3>
          <span className="mt-1 text-secondary-gray">It's quick and easy.</span>
        </div>
        <Cross
          size={20}
          cursor={'pointer'}
          onClick={() => setShowModal(false)}
        />
      </div>
      <hr className="w-full my-3 border-[#dadde1] border-t" />

      <form
        className="px-4 flex items-center flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <NameField {...formFieldProps} />
        <EmailField {...formFieldProps} />
        <PasswordField {...formFieldProps} />

        <div className="mt-3 flex flex-col w-full">
          <label
            htmlFor="dateOfBirth"
            className="text-secondary-gray text-xs flex items-center gap-1"
          >
            <span>Date of birth</span> <QuestionFill size={14} />
          </label>
          <div className="flex gap-3 mt-1">
            <select
              {...register('day')}
              className="border flex-1 rounded px-2 flex justify-between py-1"
              defaultValue={new Date().getDate()}
            >
              {DAY_ARR.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            <select
              {...register('month')}
              className="border flex-1 rounded px-2 flex justify-between py-1"
            >
              {MONTH_ARR.map((month, index) => (
                <option key={month} value={index}>
                  {month.slice(0, 3)}
                </option>
              ))}
            </select>
            <select
              {...register('year')}
              className="border flex-1 rounded px-2 flex justify-between py-1"
            >
              {YEAR_ARR.reverse().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-col w-full">
          <label
            htmlFor="dateOfBirth"
            className="text-secondary-gray text-xs flex items-center gap-1"
          >
            <span>Gender</span> <QuestionFill size={14} />
          </label>

          <div className="flex gap-3 mt-1">
            <label
              htmlFor="female"
              className="border flex-1 rounded px-2 flex justify-between py-1"
            >
              Female
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value={Gender.FEMALE}
                id="female"
              />
            </label>
            <label
              htmlFor="male"
              className="border flex-1 rounded px-2 flex justify-between py-1"
            >
              Male
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value={Gender.MALE}
                id="male"
              />
            </label>
            <label
              htmlFor="other"
              className="border flex-1 rounded px-2 flex justify-between py-1"
            >
              {' '}
              Other
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value={Gender.OTHER}
                id="other"
              />
            </label>
          </div>
        </div>

        <p className="text-secondary-gray text-xs mt-2">
          People who use our service may have uploaded your contact information
          to Facebook.{' '}
          <Link to="/" className=" text-primary-blue">
            Learn more.
          </Link>
        </p>
        <p className="text-secondary-gray text-xs mt-2">
          By clicking Sign Up, you agree to our{' '}
          <Link to="/" className=" text-primary-blue">
            Terms
          </Link>
          ,{' '}
          <Link to="/" className=" text-primary-blue">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/" className=" text-primary-blue">
            Cookies Policy
          </Link>
          . You may receive SMS notifications from us and can opt out at any
          time.
        </p>

        <button className="bg-[#00a400] text-white font-bold text-lg rounded px-16 py-1 my-4">
          Sign Up{' '}
        </button>
      </form>
    </div>
  );
};
