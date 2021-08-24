import Register from "../../components/Auth/Register";
import SignIn from "../../components/Auth/SignIn";

const index = () => {
  return (
    <div className='auth-page grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-1 rounded-sm'>
      <div className='auth-left row-span-1' />
      <div className='row-span-2 h-full w-full flex flex-col items-center justify-center bg-gray-100'>
        <div className='m-10 border-2 border-blue-300'>
          <button className='rounded-sm py-2 px-6 text-lg bg-blue-300 focus:outline-none'>
            Log In
          </button>
          <button className='rounded-sm py-2 px-6 text-lg focus:outline-none'>
            Register
          </button>
        </div>
        <Register />
        <SignIn />
      </div>
    </div>
  );
};

export default index;
