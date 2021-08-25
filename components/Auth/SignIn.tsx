import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [submitting, setSub] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async ({ email, password }: FormData) => {
    setSub(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
    setSub(false);
  });

  return (
    <div className='w-full flex flex-col items-center gap-4 text-xl'>
      <h2 className='text-4xl  mb-2'>Sign In</h2>

      <form className='w-3/4 flex flex-col gap-4 p-2' onSubmit={onSubmit}>
        <FormInput
          registerRef={{
            ...register("email", { required: "Need a valid email address" }),
          }}
          name='email'
          type='email'
          label='Email'
          errorMessage={errors?.email?.message}
        />

        <FormInput
          registerRef={{
            ...register("password", {
              required: "Password Required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters or more",
              },
              validate: (val) =>
                [/[a-z]/, /[0-9]/].every((pattern) => pattern.test(val)) ||
                "Must include letters and numbers",
            }),
          }}
          label='Password'
          name='password'
          type='password'
          errorMessage={errors?.password?.message}
        />

        <input
          type='submit'
          className='bg-green-400 text-gray-800 p-3 mt-8 text-2xl'
          value={"Log In"}
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default SignIn;
