import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import "tailwindcss/tailwind.css";
import "../layout.css";
import { useEffect } from "react";
import { User } from "@prisma/client";
import firebase from "firebase";
import firebaseClient from "../utils/firebase/firebaseClient";
import nookies from "nookies";
import { wrapper } from "../redux/store";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/actions/userActions";
import { Header } from "../components/Header";
import { NextPage } from "next";
import commerce from "../utils/CommerceJS/commerce";
import { updateCategories, updateProducts } from "../redux/actions/shopActions";
import { app } from "firebase-admin";

function MyApp({ Component, pageProps }: AppProps) {
  firebaseClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged(async (firebaseUser: firebase.User | null) => {
        if (!firebaseUser) {
          dispatch(setCurrentUser(null));
          console.log("I was set to null here");
          nookies.set(undefined, "token", "", {});
          return;
        }
        console.log("I AM THE USER", firebaseUser);
        const token = await firebaseUser.getIdToken();
        const user: User | null = {
          displayName:
            firebaseUser.displayName /*TODO in registration*/ ?? "yee",
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "email not provided",
        };
        dispatch(setCurrentUser(user));
        nookies.set(undefined, "token", token, {});
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <div className='mx-2 my-4'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const appState = appContext.ctx.store.getState();

  if (!appState.shop.products) {
    const { data: products } = await commerce.products.list({ limit: 200 });
    appContext.ctx.store.dispatch(updateProducts(products));
  }

  if (!appState.shop.categories) {
    const { data: categories } = await commerce.categories.list();
    appContext.ctx.store.dispatch(updateCategories(categories));
  }

  return {
    ...appProps,
    pageProps: {
      ...(appContext.Component.getInitialProps
        ? await appContext.Component.getInitialProps(appContext.ctx)
        : {}),
    },
  };
};

export default wrapper.withRedux(MyApp);
