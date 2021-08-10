import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ShoppingBag, { CartDropdown } from "./ShoppingBag";
import { User } from "@prisma/client";
import { useSelector } from "react-redux";
import { AppState } from "../redux/types";
import { useState } from "react";

const Option = ({
  text,
  link,
  imgURL,
  imgStyle,
  textStyle,
}: {
  text?: string;
  link: string;
  imgURL?: string;
  imgStyle?: string;
  textStyle?: string;
}) => {
  const router = useRouter();

  return (
    <Link href={`${link.toLowerCase()}`}>
      <a
        className='flex items-center px-1'
        style={
          router.pathname.toString() == link.toLowerCase()
            ? { borderBottom: "3px solid #FDE047" }
            : { border: "none" }
        }
      >
        {imgURL ? (
          <img
            className={imgStyle ? `${imgStyle}` : "w-6 h-6"}
            src={`${imgURL}`}
          />
        ) : null}
        {text ? (
          <span className={`text-lg cursor-pointer ${textStyle}`}>{text}</span>
        ) : null}
      </a>
    </Link>
  );
};

export const Header = () => {
  const [hidden, setHidden] = useState(true);

  const currentUser: User | null = useSelector(
    (state: AppState) => state.user.currentUser
  );
  return (
    <>
      <Head>
        <title>Cool Clothes 😎🌊☀</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <nav>
        <div className='max-w-screen-2xl mx-auto pt-0.5 mb-4 px-4'>
          <div className='flex items-center justify-between'>
            {/* Main Logo */}
            <div className='flex'>
              <Link href='/'>
                <a className='text-2xl md:text-3xl lg:text-4xl font-hand'>
                  Cool Clothes
                </a>
              </Link>
            </div>

            {/* Navigation */}
            <div className='hidden md:flex space-x-12'>
              <div className='flex space-x-8'>
                <Option
                  text='Home'
                  link='/'
                  textStyle='text-xl font-semibold px-1'
                />
                <Option
                  text='Shop'
                  link='/shop'
                  textStyle='text-xl font-semibold px-1'
                />
              </div>
              <div className='dash-border' />
              <div className='flex md:space-x-6 lg:space-x-2 '>
                <Option
                  text={currentUser ? "Your Account" : "Login/Register"}
                  link={currentUser ? "/auth/user" : "/auth"}
                  imgURL='/user.svg'
                />
                <Option text='Checkout' link='/checkout' imgURL='/cart.svg' />
              </div>
              <div className='flex '>
                <ShoppingBag />
                <Option
                  link='/wishlist'
                  imgURL='/heart.svg'
                  imgStyle='w-9 h-9'
                />
              </div>
            </div>
            <CartDropdown />

            {/* Mobile Button */}

            <div className='md:hidden flex items-center'>
              <button onClick={() => setHidden(!hidden)}>OwO</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        <div className={hidden ? "hidden" : ""}>
          <Option text='Home' link='/' textStyle='text-xl font-semibold px-1' />
          <Option
            text='Shop'
            link='/shop'
            textStyle='text-xl font-semibold px-1'
          />

          <Option
            text={currentUser ? "Your Account" : "Login/Register"}
            link={currentUser ? "/auth/user" : "/auth"}
          />
          <Option text='Checkout' link='/checkout' />

          <ShoppingBag />
          <Option link='/wishlist' text='Wishlist' />
        </div>
      </nav>
    </>
  );
};

// <div className='w-full h-14 mb-5 flex items-center justify-evenly px-5 z-20'>
// <div className='h-full w-1/2 flex items-center'>
//   <Link href='/'>
//     <a className='text-4xl font-hand'>Cool Clothes</a>
//   </Link>
// </div>
// <div className='w-1/2 h-full flex items-center justify-end'>
//   <div className='flex w-1/3 justify-center dash-border'>
//     <Option
//       text='Home'
//       link='/'
//       textStyle='text-xl font-semibold px-4'
//     />
//     <Option
//       text='Shop'
//       link='/shop'
//       textStyle='text-xl font-semibold px-4'
//     />
//   </div>
//   <div className='flex w-1/3 justify-center'>
//     <Option
//       text={currentUser ? "Your Account" : "Login/Register"}
//       link={currentUser ? "/auth/user" : "/auth"}
//       imgURL='/user.svg'
//     />
//     <Option text='Checkout' link='/checkout' imgURL='/cart.svg' />
//   </div>
//   <div className='flex w-1/3 justify-end'>
//     <ShoppingBag />
//     <Option link='/wishlist' imgURL='/heart.svg' imgStyle='w-9 h-9' />
//   </div>
// </div>
// <CartDropdown />
// </div>
