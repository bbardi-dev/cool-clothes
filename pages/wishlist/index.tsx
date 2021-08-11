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
      <p>Your Wishlist:</p>

      <div className='flex flex-wrap justify-start items-center gap-12'>
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
    <div>
      <p>{`Hi ${user?.displayName ?? "Guest"}`}</p>
      {user ? signedInView : <p>Please Sign In to view your Wishlist!</p>}
    </div>
  );
};

export default index;
