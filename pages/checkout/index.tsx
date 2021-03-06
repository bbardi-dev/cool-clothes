import { useSelector } from "react-redux";
import CheckoutItem from "../../components/Checkout/CheckoutItem";
import StripeButton from "../../components/Checkout/StripeButton";
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
    <div className='flex flex-col gap-6 items-center mt-12'>
      <div className='w-full grid grid-cols-5 border-b-4 border-yellow-300 text-sm text-center md:text-4xl'>
        <div>Product</div>
        <div>Description</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Remove</div>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <p className='text-2xl'>No items in Cart</p>
      )}
      <div className='text-3xl'>TOTAL: ${totalValue.toFixed(2)}</div>
      {cartItems.length > 0 ? (
        <>
          <div>
            *Use this test card data*: <br />
            Card number: 4242 4242 4242 4242, <br />
            MM/YY: any valid date, <br />
            CVC: any three digit number
          </div>
          <StripeButton price={totalValue} />
        </>
      ) : null}
    </div>
  );
};

export default index;
