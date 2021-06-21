import React from "react";

interface Props {
  label: string;
  [x: string]: any;
}

export const FormInput = ({ label, registerRef, ...otherProps }: Props) => {
  return (
    <div className='relative mx-11 my-0'>
      <input
        className=' bg-none bg-pink-100 text-gray-900 text-lg p-2.5 pb-1 block w-full rounded-none border-b-2 border-gray-900 mx-6 my-0 focus:outline-none'
        {...registerRef}
        {...otherProps}
      />
      {label ? (
        <label
          className='text-gray-900 text-base font-semibold absolute pointer-events-none left-0 -top-2 transition ease-linear duration-300 '
          htmlFor={otherProps.name}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};
