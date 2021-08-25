import { useState } from "react";
import Register from "../../components/Auth/Register";
import SignIn from "../../components/Auth/SignIn";

type FormShown = "register" | "signin";

const index = () => {
  const [formShown, setFormShown] = useState<FormShown>("register");

  return (
    <div className='auth-page grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-1 rounded-sm'>
      <div className='auth-left row-span-1' />
      <div className='row-span-2 h-full w-full flex flex-col items-center justify-center '>
        <div className='m-10 border-2 rounded-md border-indigo-600'>
          <button
            onClick={() => setFormShown("signin")}
            className={`rounded-sm py-2 px-6 text-lg focus:outline-none ${
              formShown === "signin"
                ? "bg-indigo-600 text-white font-semibold"
                : null
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setFormShown("register")}
            className={`rounded-sm py-2 px-6 text-lg focus:outline-none ${
              formShown === "register"
                ? "bg-indigo-600 text-white font-semibold"
                : null
            }`}
          >
            Register
          </button>
        </div>
        {formShown === "register" ? <Register /> : <SignIn />}
      </div>
    </div>
  );
};

export default index;
