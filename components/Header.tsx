import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ShoppingBag, { CartDropdown } from "./ShoppingBag";
import { User } from "@prisma/client";
import { useSelector } from "react-redux";
import { AppState, ReduxUser } from "../redux/types";
import { useEffect, useState } from "react";

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

  const currentUser: ReduxUser | null = useSelector(
    (state: AppState) => state.user.currentUser
  );

  useEffect(() => {
    window.addEventListener("resize", () => setHidden(true));
  }, []);

  return (
    <>
      <Head>
        <title>Cool Clothes 😎🌊☀</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <nav>
        <div
          className={`max-w-screen-2xl mx-auto pt-0.5 px-4 ${
            hidden ? "" : "bg-gray-800 text-blue-100 "
          }`}
        >
          <div className='flex items-center justify-between'>
            {/* Main Logo */}
            {hidden ? (
              <div className='flex'>
                <Link href='/'>
                  <a className='text-3xl lg:text-4xl font-hand'>Cool Clothes</a>
                </Link>
              </div>
            ) : (
              <div />
            )}

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
                  text={currentUser ? "Your Account" : "Sign In/Register"}
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

            <div className='md:hidden mb-2 flex items-center space-x-2'>
              {hidden ? <ShoppingBag /> : <div />}
              <button
                className='focus:outline-none'
                onClick={() => setHidden(!hidden)}
              >
                {hidden ? (
                  <svg
                    fill='none'
                    height='36'
                    stroke={`${hidden ? "#1F2937" : "#DBEAFE"}`}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    width='36'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <line x1='3' x2='21' y1='12' y2='12' />
                    <line x1='3' x2='21' y1='6' y2='6' />
                    <line x1='3' x2='21' y1='18' y2='18' />
                  </svg>
                ) : (
                  <svg
                    fill='none'
                    height='36'
                    stroke='#DBEAFE'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    width='36'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <line x1='18' x2='6' y1='6' y2='18' />
                    <line x1='6' x2='18' y1='6' y2='18' />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        <div
          className={`rounded-sm p-2 mb-3 flex flex-col items-center ${
            hidden ? "hidden" : "bg-gray-800 "
          }`}
        >
          <Option
            text='Home'
            link='/'
            textStyle='font-semibold text-blue-100'
          />
          <Option
            text='Shop'
            link='/shop'
            textStyle='font-semibold text-blue-100'
          />

          <Option
            text={currentUser ? "Your Account" : "Sign In/Register"}
            link={currentUser ? "/auth/user" : "/auth"}
            textStyle='font-semibold text-blue-100'
          />
          <Option
            text='Checkout'
            link='/checkout'
            textStyle='font-semibold text-blue-100'
          />

          <Option
            link='/wishlist'
            text='Wishlist'
            textStyle='font-semibold text-blue-100'
          />
        </div>
      </nav>
    </>
  );
};
