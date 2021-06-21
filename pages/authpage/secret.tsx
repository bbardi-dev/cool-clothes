import firebase from "firebase/app";
import { GetServerSideProps } from "next";
import firebaseClient from "../../utils/firebase/firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../utils/firebase/firebaseAdmin";
import { useRouter } from "next/dist/client/router";

const secret = ({
  session,
  error,
}: {
  session: { uid: string; email: string };
  error?: any;
}) => {
  const router = useRouter();

  async function signOut() {
    await firebase.auth().signOut();
    router.push("/");
  }

  firebaseClient();

  if (error) {
    return (
      <>
        <h1>{error}</h1>
        <button
          className='bg-purple-900 text-pink-50 p-3 rounded-md m-2'
          onClick={() => router.push("/authpage")}
        >
          Please Log In to view this page!
        </button>
      </>
    );
  }

  if (session) {
    return (
      <div>
        <p>{`Welcome O, ${session.email}`}</p>
        <br />
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await verifyIdToken(cookies.token);

    const { uid, email } = token;
    return {
      props: {
        session: {
          uid,
          email,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Unauthorized request",
      },
    };
  }
};

export default secret;
