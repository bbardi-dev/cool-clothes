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
    <div className='w-full h-full flex border-b-2 p-1 border-gray-800 items-center'>
      <div className='w-2/12 pr-4 '>
        <img
          src={item.media?.source}
          alt='item'
          className='w-full h-full rounded-md'
        />
      </div>
      <span className='w-2/12 text-lg'>{item.name}</span>
      <span className='w-2/12 text-lg font-semibold'>
        {item.price?.formatted_with_symbol}
      </span>
      <span className='w-2/12  flex'>
        <div
          className='cursor-pointer'
          onClick={() => dispatch(removeItem(item))}
        >
          &#10094;
        </div>
        <span className='my-0 mx-3'>{item.quantity}</span>
        <div className='cursor-pointer' onClick={() => dispatch(addItem(item))}>
          &#10095;
        </div>
      </span>
      <div
        onClick={() => dispatch(removeItemFromCart(item))}
        className='w-2/12 pl-4 cursor-pointer '
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
