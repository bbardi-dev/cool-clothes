import { useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";
import CollectionItem from "../../components/Collection/CollectionItem";
import WishlistIcon from "../../components/WishlistIcon";
import { useEffect, useState } from "react";

const index = () => {
  const products = useSelector((state: AppState) => state.shop.products);
  const user = useSelector((state: AppState) => state.user.currentUser);
  const [inWishList, setInWishList] = useState<Product[] | null>(null);

  useEffect(() => {
    setInWishList(
      products?.filter((product: Product) =>
        user?.wishlist?.includes(product.id ?? "")
      ) ?? []
    );
  }, []);

  const signedInView = (
    <>
      <p className='text-center text-4xl m-10 italic border-b-4 border-yellow-300 self-center w-3/5 md:w-1/5'>
        Your Wishlist:
      </p>

      <div className='gridding'>
        {inWishList &&
          inWishList.map((product: Product) => (
            <CollectionItem
              key={product.id}
              product={product}
              withWishlist={() => <WishlistIcon productId={product.id} />}
            />
          ))}
      </div>
    </>
  );

  return (
    <div className='w-full h-full flex flex-col'>
      {user ? (
        signedInView
      ) : (
        <p className='text-center text-4xl mt-48'>
          Please Sign In to view your Wishlist!
        </p>
      )}
    </div>
  );
};

export default index;
