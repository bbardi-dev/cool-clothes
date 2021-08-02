import { useSelector } from "react-redux";
import { AppState } from "../redux/types";

interface Props {
  productId?: string;
  tailwindClasses: string;
  action: "ADD" | "REMOVE";
}

export default function AddToWishlist({
  productId,
  tailwindClasses,
  action,
}: Props) {
  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";

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

      return await response.json();
    }
    //TODO Proper handling of not logged in user
    return alert("Please Log In to do that!");
  };

  const removeFromWishlist = () => {
    return alert("TODO");
  };

  return (
    <img
      onClick={action === "ADD" ? addToWishlist : removeFromWishlist}
      className={tailwindClasses}
      src='/heart.svg'
    />
  );
}
