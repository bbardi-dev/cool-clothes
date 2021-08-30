import firebase from "firebase/app";
import firebaseClient from "../../utils/firebase/firebaseClient";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/userActions";
import { AppState, ReduxUser } from "../../redux/types";

const user = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser: ReduxUser | null = useSelector(
    (state: AppState) => state.user.currentUser
  );

  firebaseClient();

  async function signOut() {
    await firebase.auth().signOut();
    dispatch(setCurrentUser(null));
    router.push("/");
  }

  if (!currentUser) {
    return (
      <>
        <button className='' onClick={() => router.push("/auth")}>
          Please Log In to view this page!
        </button>
      </>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-evenly p-2'>
      <p className='text-7xl font-hand text-center'>{`Welcome back, ${currentUser.displayName}!`}</p>
      <button
        className='bg-pink-400 p-6 mt-8 text-6xl rounded-sm'
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default user;
