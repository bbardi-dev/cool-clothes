import firebase from "firebase/app";
import { GetServerSideProps } from "next";
import firebaseClient from "../../utils/firebase/firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../utils/firebase/firebaseAdmin";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/userActions";
import { User } from "@prisma/client";
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
    <div>
      <p>{`Welcome back, ${currentUser.displayName}!`}</p>
      <br />
      <button className='' onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default user;
