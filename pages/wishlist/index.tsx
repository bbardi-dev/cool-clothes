import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import prisma from "../../prisma/prisma";
import { wrapper } from "../../redux/store";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";
import CollectionItem from "../../components/Collection/CollectionItem";

const index = () => {
  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";
  const products = useSelector((state: AppState) => state.shop.products);

  const [itemIds, setIds] = useState<string[]>([]);
  const [username, setUserame] = useState<string>("Guest");

  const getWishlistItems = async (userId: string | null) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        body: JSON.stringify({
          uid: userId,
        }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getWishlistItems(uid);
      if (res) {
        setUserame(res.displayName);
        setIds(res.wishlist);
      }
    })();
  }, [uid]);

  const inWishList: Product[] =
    products?.filter((product: Product) =>
      itemIds.includes(product.id ?? "")
    ) ?? [];

  const signedInView = (
    <>
      <p>Your Wishlist:</p>

      <div className='flex flex-wrap justify-start items-center gap-12'>
        {products
          ? inWishList.map((product) => (
              <CollectionItem key={product.id} product={product} />
            ))
          : null}
      </div>
    </>
  );

  return (
    <div>
      <p>{`Hi ${username}`}</p>
      {uid ? signedInView : <p>Please Sign In to view your Wishlist!</p>}
    </div>
  );
};

export default index;
