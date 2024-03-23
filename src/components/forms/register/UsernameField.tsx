import { AxiosError } from 'axios';
import { FC } from 'react';
import { checkUsernameExists } from '../../../utils/api';
import { RegisterFormFieldProps } from '../../../utils/types/form';

export const UsernameField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="bg-[#131313] px-4 py-3 rounded-[10px]">
      <div className="flex justify-between">
        <label htmlFor="username" className="text-[#8f8f8f] my-1 text-sm">
          Username
        </label>
        {errors.username && (
          <span className="text-[#ff0000] uppercase text-[11px]">
            {errors.username.message}
          </span>
        )}
      </div>
      <input
        className="text-lg font-medium my-1 w-full bg-inherit outline-none"
        type="text"
        id="username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Must be 3 characters long',
          },
          maxLength: {
            value: 16,
            message: 'Exceeds 16 characters',
          },
          validate: {
            checkUsername: async (username: string) => {
              try {
                await checkUsernameExists(username);
              } catch (err) {
                return (
                  (err as AxiosError).response?.status === 409 &&
                  'Username already exists'
                );
              }
            },
          },
        })}
      />
    </div>
  );
};
