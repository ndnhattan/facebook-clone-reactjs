import { FC } from 'react';
import { RegisterFormFieldProps } from '../../../utils/types/form';

export const NameField: FC<RegisterFormFieldProps> = ({ register, errors }) => {
  return (
    <section className="flex justify-between gap-3 w-full mt-1">
      <div className=" px-3 py-2 rounded-md w-full  bg-primary-gray border">
        <div className="flex justify-between">
          {errors.firstName && (
            <span className="text-[#ff0000] uppercase text-[11px]">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <input
          placeholder="First name"
          className="w-full bg-inherit outline-none"
          type="text"
          id="firstName"
          {...register('firstName', {
            required: 'First Name is Required',
            minLength: 2,
            maxLength: 32,
          })}
        />
      </div>
      <div className=" px-3 py-2 rounded-md w-full  bg-primary-gray border">
        <div className="flex justify-between">
          {errors.lastName && (
            <span className="text-[#ff0000] uppercase text-[11px]">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <input
          placeholder="Last name"
          className="w-full bg-inherit outline-none"
          type="text"
          id="lastName"
          {...register('lastName', {
            required: 'Last Name is Required',
            minLength: 2,
            maxLength: 32,
          })}
        />
      </div>
    </section>
  );
};
