import Link from "next/link";
import Head from "next/head";
import ShoppingBag, { CartDropdown } from "./ShoppingBag";
import { useState } from "react";

const Option = ({ text, link }: { text: string; link: string }) => (
  <Link href={`/${link.toLowerCase()}`}>
    <span className='px-3.5 py-4 cursor-point'>{text}</span>
  </Link>
);

export const Header = () => {
  return (
    <>
      <Head>
        <title>Cool Clothes 😎🌊☀</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='h-14 items-center w-full mb-60 flex justify-between pl-12 pr-12'>
        <div className='h-full w-1/2 flex items-center'>
          <Link href='/'>
            <a className='text-4xl font-hand'>Cool Clothes</a>
          </Link>
        </div>
        <div className='w-1/2 h-full flex items-center justify-end'>
          <Option text='Home' link='' />
          <Option text='Shop' link='shop' />
          <Option text='Login/Register' link='authpage' />
          <Option text='Secret' link='authpage/secret' />
          <Option text='Checkout' link='checkout' />
          <ShoppingBag />
        </div>
        <CartDropdown />
      </div>
    </>
  );
};
