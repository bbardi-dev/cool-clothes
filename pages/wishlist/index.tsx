import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";

const index = () => {
  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";
  const products = useSelector((state: AppState) => state.shop.products);

  const [itemIds, setIds] = useState<string[]>([]);
  const [username, setUserame] = useState<string>("Guest");

  const getWishlistItems = async (userId: string | null) => {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({
        uid: userId,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

  useEffect(() => {
    (async () => {
      const res = await getWishlistItems(uid);
      setUserame(res.displayName);
      setIds(res.wishlist);
    })();
  }, [uid]);

  const inWishList: Product[] =
    products?.filter((product: Product) =>
      itemIds.includes(product.id ?? "")
    ) ?? [];

  return (
    <div>
      <p>{`Hi ${username}`}</p>
      <p>Your wishlist is:</p>
      {inWishList &&
        inWishList?.map((item) => (
          <p key={item.id}>
            <span>{item.name}</span>
            <br />
          </p>
        ))}
    </div>
  );
};

export default index;
