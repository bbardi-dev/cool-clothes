import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { clearAllItemsFromCart } from "../../redux/actions/cartActions";

export default function StripeButton({ price }: { price: number }) {
  const dispatch = useDispatch();
  const priceInCents = price * 100;

  const onToken = () => {
    dispatch(clearAllItemsFromCart());
    alert("Payment Successful!");
  };

  return (
    <StripeCheckout
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""}
      token={onToken}
      label='Pay Now'
      name='Cool-Clothes'
      image='./favicon.ico'
      billingAddress
      shippingAddress
      description={`Total Price: ${price}`}
      amount={priceInCents}
    />
  );
}
