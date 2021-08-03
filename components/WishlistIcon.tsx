import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../redux/actions/userActions";
import { AppState } from "../redux/types";

interface Props {
  productId?: string;
  tailwindClasses?: string;
}

export default function AddToWishlist({ productId, tailwindClasses }: Props) {
  const dispatch = useDispatch();
  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";

  const wishlist = useSelector(
    (state: AppState) => state.user.currentUser?.wishlist
  );

  const [disabled, setDisabled] = useState(false);

  const inWishList = wishlist?.includes(productId || "");

  const addToWishlist = async () => {
    setDisabled(true);

    if (!productId) {
      alert("Something went wrong, try again!");
      setDisabled(false);
    }

    if (uid) {
      const response = await fetch("/api/wishlist", {
        method: "PUT",
        body: JSON.stringify({
          uid: uid,
          wishlistItem: productId,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const userData = await response.json();
      dispatch(updateWishlist(userData.wishlist));
      alert("ADDED TO WISHLIST");
      setDisabled(false);
    } else {
      alert("Please Log In to do that!");
      setDisabled(false);
    }
  };

  const removeFromWishlist = async () => {
    setDisabled(true);

    if (!productId) {
      alert("Something went wrong, try again!");
      setDisabled(false);
    }

    if (uid) {
      const wishlistWithoutItem = wishlist?.filter(
        (item) => item !== productId
      );

      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({
          uid: uid,
          wishlist: wishlistWithoutItem,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const userData = await response.json();
      dispatch(updateWishlist(userData.wishlist));
      alert("REMOVED FROM WISHLIST");
      setDisabled(false);
    } else {
      alert("Please Log In to do that!");
      setDisabled(false);
    }
  };

  return (
    <button
      className={`w-12 h-12 ${tailwindClasses}`}
      onClick={inWishList ? removeFromWishlist : addToWishlist}
      disabled={disabled}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={
          inWishList
            ? "text-red-400 hover:text-blue-100"
            : "text-blue-100 hover:text-red-400"
        }
        fill='currentColor'
        viewBox='0 0 24 24'
        stroke='#F87171'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.2'
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
    </button>
  );
}
