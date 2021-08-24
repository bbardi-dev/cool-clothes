interface Props {
  label: string;
  errorMessage: string | undefined;
  [x: string]: any;
}

export const FormInput = ({
  label,
  registerRef,
  errorMessage,
  ...otherProps
}: Props) => {
  return (
    <div className='flex flex-col items-center justify-between group w-full h-full'>
      <label className='pointer-events-none mx-4' htmlFor={otherProps.name}>
        {label}
      </label>

      <input
        className='focus:outline-none bg-transparent border-2 border-white rounded-sm bg-white p-1 focus:border-blue-600 w-full h-full'
        {...registerRef}
        {...otherProps}
      />

      {errorMessage ? (
        <span className='text-sm text-red-600'>{errorMessage}</span>
      ) : null}
    </div>
  );
};
