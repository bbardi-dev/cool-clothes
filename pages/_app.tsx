import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { User } from "@prisma/client";
import firebase from "firebase";
import nookies from "nookies";
import { AnimatePresence, motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import "../layout.css";
import firebaseClient from "../utils/firebase/firebaseClient";
import commerce from "../utils/CommerceJS/commerce";
import { wrapper } from "../redux/store";
import { setCurrentUser } from "../redux/actions/userActions";
import { updateCategories, updateProducts } from "../redux/actions/shopActions";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  firebaseClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged(async (firebaseUser: firebase.User | null) => {
        if (!firebaseUser) {
          dispatch(setCurrentUser(null));
          nookies.set(undefined, "token", "", {});
          return;
        }
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
    <AnimatePresence exitBeforeEnter>
      <Header />
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ y: 60, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeIn" },
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
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
