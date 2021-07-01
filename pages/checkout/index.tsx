import { useSelector } from "react-redux";
import CheckoutItem from "../../components/Checkout/CheckoutItem";
import { AppState } from "../../redux/types";

const index = () => {
  const cartItems = useSelector((state: AppState) => state.cart.cartItems);

  const totalValue = useSelector((state: AppState) =>
    state.cart.cartItems.reduce(
      (a, cartItem) =>
        a +
        (cartItem.quantity ? cartItem.quantity : 1) *
          (cartItem?.price?.raw ?? 1),
      0
    )
  );

  //TODO probably change this layout to GRID

  return (
    <div className=' w-1/2 h-screen flex flex-col gap-4 items-center mt-14 mb-0 mx-auto'>
      <div className='w-full h-10 flex justify-between border-b-4 border-gray-800'>
        <div className='w-3/12'>
          <span>Product</span>
        </div>
        <div className='w-3/12'>
          <span>Description</span>
        </div>
        <div className='w-3/12'>
          <span>Quantity</span>
        </div>
        <div className='w-3/12'>
          <span>Price</span>
        </div>
        <div className='w-3/12'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <p className='text-4xl'>No items in Cart</p>
      )}
      <div>
        <span>TOTAL: ${totalValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default index;
