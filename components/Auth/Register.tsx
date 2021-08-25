import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { User } from "@prisma/client";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput";

interface FormData {
  email: string;
  password: string;
  displayName: string;
}

const Register = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [submitting, setSub] = useState<boolean>(false);

  const router = useRouter();

  async function saveUser(user: User) {
    const response = await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  const onSubmit = handleSubmit(
    async ({ email, password, displayName }: FormData) => {
      setSub(true);

      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await user?.updateProfile({ displayName: displayName });

        if (user && user.uid) {
          await saveUser({
            uid: user.uid,
            wishlist: [],
            displayName: displayName,
          });
        } else throw new Error("Something went wrong!");
      } catch (error) {
        console.log(error.message);
      } finally {
        router.push("/");
      }
      setSub(false);
    }
  );

  return (
    <div className='w-full flex flex-col items-center gap-4 text-xl'>
      <h2 className='text-4xl  mb-2'>Register an Account</h2>

      <form className='w-3/4 flex flex-col gap-4 p-2' onSubmit={onSubmit}>
        <FormInput
          registerRef={{
            ...register("email", {
              required: "Need a valid email address",
            }),
          }}
          name='email'
          type='email'
          label='Email'
          errorMessage={errors?.email?.message}
        />

        <FormInput
          registerRef={{
            ...register("displayName", { required: "Username required" }),
          }}
          name='displayName'
          type='text'
          label='Display Name'
          errorMessage={errors?.displayName?.message}
        />

        <FormInput
          registerRef={{
            ...register("password", {
              required: "Password required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters or more",
              },
              validate: (val) =>
                [/[a-z]/, /[0-9]/].every((pattern) => pattern.test(val)) ||
                "Must include letters and numbers",
            }),
          }}
          name='password'
          type='password'
          label='Password'
          errorMessage={errors?.password?.message}
        />

        <input
          type='submit'
          className='bg-green-400 text-gray-800 p-3 mt-8 text-2xl'
          value={"Register"}
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default Register;
