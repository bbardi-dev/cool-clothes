import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../redux/actions/userActions";
import { AppState } from "../redux/types";

interface Props {
  productId?: string;
  tailwindClasses: string;
}

export default function AddToWishlist({ productId, tailwindClasses }: Props) {
  const dispatch = useDispatch();
  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";

  const wishlist = useSelector(
    (state: AppState) => state.user.currentUser?.wishlist
  );

  const inWishList = wishlist?.includes(productId || "");

  const addToWishlist = async () => {
    if (!productId) return alert("Something went wrong, try again!");

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
      dispatch(updateWishlist([wishlist, ...userData.wishlist]));
    }
    //TODO Proper handling of not logged in user
    else alert("Please Log In to do that!");
  };

  const removeFromWishlist = () => {
    return alert("TODO");
  };

  return (
    <img
      onClick={inWishList ? removeFromWishlist : addToWishlist}
      className={tailwindClasses}
      src='/heart.svg'
    />
  );
}
