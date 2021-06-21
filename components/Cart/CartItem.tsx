import React from "react";
import Image from "next/image";
import { Product } from "../../utils/types";

interface Props {
  item: Product;
}

const CartItem = ({ item: { name, media, id, price, quantity } }: Props) => {
  return (
    <div className=' w-full flex h-20 mb-4'>
      <Image
        width={60}
        height={120}
        src={media?.source ?? ""}
        quality={100}
        alt='item'
      ></Image>
      <div className='w-3/4 flex flex-col items-start justify-center px-3 py-5'>
        <span>{name}</span>
        <span>
          {quantity} x {price?.formatted_with_symbol}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
