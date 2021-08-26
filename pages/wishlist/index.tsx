import { useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";
import CollectionItem from "../../components/Collection/CollectionItem";
import WishlistIcon from "../../components/WishlistIcon";

const index = () => {
  const products = useSelector((state: AppState) => state.shop.products);
  const user = useSelector((state: AppState) => state.user.currentUser);

  const inWishList: Product[] =
    products?.filter((product: Product) =>
      user?.wishlist?.includes(product.id ?? "")
    ) ?? [];

  const signedInView = (
    <>
      <p className='text-center text-4xl m-10 italic border-b-4 border-yellow-300 self-center w-3/5 md:w-1/5'>
        Your Wishlist:
      </p>

      <div className='gridding'>
        {products
          ? inWishList.map((product) => (
              <CollectionItem
                key={product.id}
                product={product}
                withWishlist={() => <WishlistIcon productId={product.id} />}
              />
            ))
          : null}
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
