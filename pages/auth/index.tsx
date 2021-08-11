import { User } from "@prisma/client";
import { useSelector } from "react-redux";
import Register from "../../components/Auth/Register";
import SignIn from "../../components/Auth/SignIn";
import { AppState, ReduxUser } from "../../redux/types";

const index = () => {
  const currentUser: ReduxUser | null = useSelector(
    (state: AppState) => state.user.currentUser
  );

  return (
    <div className='flex flex-col md:flex-row justify-between border-8 border-indigo-500 p-4 mx-auto my-auto w-10/12 h-full'>
      <Register />
      <p>{currentUser?.displayName}</p>
      <SignIn />
    </div>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {

//   // store.dispatch({
//   //   type: SET_CURRENT_USER,
//   //   payload: {
//   //     uid: "888",
//   //     displayName: "cook",
//   //     email: "kek@kek.com",
//   //   },
//   // });
// });

export default index;
