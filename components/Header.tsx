import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ShoppingBag, { CartDropdown } from "./ShoppingBag";
import { User } from "@prisma/client";
import { useSelector } from "react-redux";
import { AppState } from "../redux/types";

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
        className='flex items-center justify-center px-2'
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
  const currentUser: User | null = useSelector(
    (state: AppState) => state.user.currentUser
  );
  return (
    <>
      <Head>
        <title>Cool Clothes 😎🌊☀</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='w-full h-14 mb-5 flex items-center justify-evenly px-5 z-20'>
        <div className='h-full w-1/2 flex items-center'>
          <Link href='/'>
            <a className='text-4xl font-hand'>Cool Clothes</a>
          </Link>
        </div>
        <div className='w-1/2 h-full flex items-center justify-end'>
          <div className='flex w-1/3 justify-center dash-border'>
            <Option
              text='Home'
              link='/'
              textStyle='text-xl font-semibold px-4'
            />
            <Option
              text='Shop'
              link='/shop'
              textStyle='text-xl font-semibold px-4'
            />
          </div>
          <div className='flex w-1/3 justify-center'>
            <Option
              text={currentUser ? "Your Account" : "Login/Register"}
              link={currentUser ? "/auth/user" : "/auth"}
              imgURL='/user.svg'
            />
            <Option text='Checkout' link='/checkout' imgURL='/cart.svg' />
          </div>
          <div className='flex w-1/3 justify-end'>
            <ShoppingBag />
            <Option link='/wishlist' imgURL='/heart.svg' imgStyle='w-9 h-9' />
          </div>
        </div>
        <CartDropdown />
      </div>
    </>
  );
};
