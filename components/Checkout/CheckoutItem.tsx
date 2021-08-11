import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  removeItemFromCart,
} from "../../redux/actions/cartActions";
import { Product } from "../../utils/types";

interface Props {
  item: Product;
}

const CheckoutItem = ({ item }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className='grid grid-cols-5 grid-rows-1 text-center items-center text-lg md:text-2xl font-semibold border-b-2 border-gray-800 p-2'>
      <div className='flex justify-center'>
        <img
          src={item.media?.source}
          alt='item'
          className='w-8/12 rounded-md'
        />
      </div>

      <div>
        <Link href={`/shop/products/${item.id}`} passHref>
          {item.name}
        </Link>
      </div>
      <div>{item.price?.formatted_with_symbol}</div>
      <div className='flex justify-center text-4xl'>
        <div
          className='cursor-pointer '
          onClick={() => dispatch(removeItem(item))}
        >
          &#10094;
        </div>
        <span className='px-2'>{item.quantity}</span>
        <div
          className='cursor-pointer '
          onClick={() => dispatch(addItem(item))}
        >
          &#10095;
        </div>
      </div>
      <div
        onClick={() => dispatch(removeItemFromCart(item))}
        className='cursor-pointer text-4xl'
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
