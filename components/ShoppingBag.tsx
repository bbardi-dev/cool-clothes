import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/actions/cartActions";
import { AppState } from "../redux/types";
import CartItem from "./Cart/CartItem";

export default function ShoppingBag() {
  const dispatch = useDispatch();
  const itemCount = useSelector((state: AppState) =>
    state.cart.cartItems.reduce(
      (a, cartItem) => a + (cartItem.quantity ? cartItem.quantity : 1),
      0
    )
  );

  return (
    <div
      onClick={() => dispatch(toggleCart())}
      className='w-12 h-12 relative cursor-pointer flex items-center justify-center'
    >
      <img className='w-9 h-9' src='/shopping-bag.svg' />
      <span className='absolute text-xs font-bold bottom-2.5'>{itemCount}</span>
    </div>
  );
}

export function CartDropdown() {
  const dispatch = useDispatch();
  const hidden = useSelector((state: AppState) => state.cart.hidden);
  const cartItems = useSelector((state: AppState) => state.cart.cartItems);
  return (
    <div
      style={{ display: !hidden ? "flex" : "none" }}
      className='absolute w-64 h-96 flex flex-col p-2 border-2 border-gray-800 bg-white top-16 right-1 z-10'
    >
      <div className='h-80 flex flex-col overflow-scroll my-2'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='font-semibold text-lg mx-10 my-auto'>
            Your cart is empty
          </span>
        )}
      </div>
      <button
        onClick={() => dispatch(toggleCart())}
        className='mt-auto border-2 bg-gray-800 text-white border-none p-1'
      >
        <Link href='/checkout'>GO TO CHECKOUT</Link>
      </button>
    </div>
  );
}
