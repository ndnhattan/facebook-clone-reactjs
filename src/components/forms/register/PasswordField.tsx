import { FC, useState } from 'react';
import { RegisterFormFieldProps } from '../../../utils/types/form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export const PasswordField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#131313] px-4 py-3 rounded-[10px]">
      <div className="flex justify-between">
        <label htmlFor="password" className="text-[#8f8f8f] my-1 text-sm">
          Password
        </label>
        {errors.password && (
          <span className="text-[#ff0000] uppercase text-[11px]">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <input
          className="text-lg font-medium my-1 w-full bg-inherit outline-none"
          type={showPassword ? 'text' : 'password'}
          id="password"
          {...register('password', {
            required: 'Password is Required',
            minLength: {
              value: 8,
              message: 'Must be at least 8 characters',
            },
            maxLength: {
              value: 32,
              message: 'Max characters is 32',
            },
          })}
        />
        {showPassword ? (
          <AiFillEyeInvisible
            size={24}
            onClick={() => setShowPassword(false)}
            cursor="pointer"
          />
        ) : (
          <AiFillEye
            size={24}
            onClick={() => setShowPassword(true)}
            cursor="pointer"
          />
        )}
      </div>
    </div>
  );
};
