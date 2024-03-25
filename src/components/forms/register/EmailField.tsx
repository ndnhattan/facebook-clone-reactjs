import { FC } from 'react';
import { RegisterFormFieldProps } from '../../../utils/types/form';

export const EmailField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="border bg-primary-gray px-3 py-2 rounded-md w-full mt-3">
      <div className="flex justify-between">
        {errors.username && (
          <span className="text-[#ff0000] uppercase text-[11px]">
            {errors.username.message}
          </span>
        )}
      </div>
      <input
        placeholder="Email address"
        className="w-full bg-inherit outline-none"
        type="text"
        id="username"
        {...register('email', {
          required: 'Username is required',
          // validate: {
          //   checkUsername: async (username: string) => {
          //     try {
          //       await checkUsernameExists(username);
          //     } catch (err) {
          //       return (
          //         (err as AxiosError).response?.status === 409 &&
          //         'Username already exists'
          //       );
          //     }
          //   },
          // },
        })}
      />
    </div>
  );
};
