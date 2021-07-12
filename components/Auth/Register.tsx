import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { User } from "@prisma/client";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput";

interface FormData {
  email: string;
  password: string;
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

  const onSubmit = handleSubmit(async ({ email, password }: FormData) => {
    setSub(true);
    console.log("registration submit", email, password);
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await saveUser({
        uid: user?.uid || "a",
        displayName: user?.displayName || "b",
        email: user?.email || "c",
      });
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
    setSub(false);
  });

  return (
    <div className='register'>
      <h2 className='font-semibold text-2xl'>Register an Account</h2>
      <br />
      <form onSubmit={onSubmit}>
        <div>
          <FormInput
            registerRef={{ ...register("email", { required: "Gib email" }) }}
            name='email'
            type='email'
            label='Email'
          />
          {errors.email ? <p>{errors?.email?.message}</p> : null}
        </div>
        <br />
        <div>
          <FormInput
            registerRef={{
              ...register("password", {
                required: "Gib Password",
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
          />
          {errors.password ? <p>{errors?.password?.message}</p> : null}
        </div>
        <br />
        <input
          type='submit'
          className='rounded py-1 px-3 font-bold text-gray-50 bg-indigo-500'
          value={"Register"}
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default Register;
