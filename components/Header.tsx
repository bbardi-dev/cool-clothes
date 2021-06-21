import Link from "next/link";
import Head from "next/head";
import ShoppingBag, { CartDropdown } from "./ShoppingBag";
import { useState } from "react";

const Option = ({ text, link }: { text: string; link: string }) => (
  <Link href={`/${link.toLowerCase()}`}>
    <span className='px-3.5 py-4 cursor-pointer text-gray-900'>
      {text.toUpperCase()}
    </span>
  </Link>
);

export const Header = () => {
  return (
    <>
      <Head>
        <title>Cool Clothing 😎🌊☀</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='h-14 items-center w-full mb-6 flex justify-between bg-pink-500 bg-opacity-50'>
        <div className='h-full w-16 p-6 flex items-center'>
          <Link href='/'>
            <a className='text-2xl font-bold'>HOME</a>
          </Link>
        </div>
        <div className='w-2/4 h-full flex items-center justify-end'>
          <Option text='shop' link='shop' />
          <Option text='Login/Sign up' link='authpage' />
          <Option text='secret' link='authpage/secret' />
          <Option text='checkout' link='checkout' />
          <ShoppingBag />
        </div>
        <CartDropdown />
      </div>
    </>
  );
};
