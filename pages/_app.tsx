import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { Router } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@prisma/client";
import firebase from "firebase";

//@ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { AnimatePresence, motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import "../layout.css";
import firebaseClient from "../utils/firebase/firebaseClient";
import commerce from "../utils/CommerceJS/commerce";
import { AppState } from "../redux/types";
import { wrapper } from "../redux/store";
import { setCurrentUser, updateWishlist } from "../redux/actions/userActions";
import { updateCategories, updateProducts } from "../redux/actions/shopActions";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.configure({
    minimum: 0.1,
    easing: "ease",
    speed: 800,
    showSpinner: false,
  });

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  firebaseClient();

  const dispatch = useDispatch();

  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged(async (firebaseUser: firebase.User | null) => {
        if (!firebaseUser) {
          dispatch(setCurrentUser(null));
          return null;
        }

        const user: User | null = {
          uid: firebaseUser.uid,
          wishlist: [],
          displayName: firebaseUser.displayName || "User",
        };
        dispatch(setCurrentUser(user));
      });

    return () => unsubscribe();
  }, []);

  const getWishlistItems = async (userId: string | null) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        body: JSON.stringify({
          uid: userId,
        }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (uid) {
      (async () => {
        const res = await getWishlistItems(uid);
        if (res) {
          dispatch(updateWishlist(res.wishlist));
        }
      })();
    }
  }, [uid]);

  return (
    <>
      <Header />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={new Date().getMilliseconds()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='max-w-screen-2xl h-auto mx-auto p-4'
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const appState: AppState = appContext.ctx.store.getState();

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
