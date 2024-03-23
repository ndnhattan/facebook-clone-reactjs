import { FC } from 'react';
import { RegisterFormFieldProps } from '../../../utils/types/form';

export const NameField: FC<RegisterFormFieldProps> = ({ register, errors }) => {
  return (
    <section className="flex justify-between my-2 gap-2">
      <div className="bg-[#131313] px-4 py-3 rounded-[10px] w-full">
        <div className="flex justify-between">
          <label htmlFor="firstName" className="text-[#8f8f8f] my-1 text-sm">
            First Name
          </label>
          {errors.firstName && (
            <span className="text-[#ff0000] uppercase text-[11px]">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <input
          className="text-lg font-medium my-1 w-full bg-inherit outline-none"
          type="text"
          id="firstName"
          {...register('firstName', {
            required: 'First Name is Required',
            minLength: 2,
            maxLength: 32,
          })}
        />
      </div>
      <div className="bg-[#131313] px-4 py-3 rounded-[10px] w-full">
        <div className="flex justify-between">
          <label htmlFor="lastName" className="text-[#8f8f8f] my-1 text-sm">
            Last Name
          </label>
          {errors.lastName && (
            <span className="text-[#ff0000] uppercase text-[11px]">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <input
          className="text-lg font-medium my-1 w-full bg-inherit outline-none"
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
