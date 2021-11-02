import Image from "next/image";
import { Product } from "../../utils/types";

interface Props {
  item: Product;
}

const CartItem = ({ item: { name, media, id, price, quantity } }: Props) => {
  return (
    <div className='w-full flex h-20 mb-4'>
      <div className='relative w-1/2 rounded-sm'>
        <Image
          src={media?.source ?? ""}
          layout='fill'
          quality={100}
          alt='cart item'
          objectFit='cover'
        />
      </div>
      <div className='w-1/2 flex flex-col items-start justify-center px-3 py-5'>
        <span>{name}</span>
        <span>
          {quantity} x {price?.formatted_with_symbol}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
