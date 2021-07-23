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
      console.log("registration submit", email, password, displayName);
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
              ...register("displayName", { required: "Gib name" }),
            }}
            name='displayName'
            type='text'
            label='Display Name'
          />
          {errors.displayName ? <p>{errors?.displayName?.message}</p> : null}
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
            name='password'
            type='password'
            label='Password'
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
