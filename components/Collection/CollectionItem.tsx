import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import wishlist from "../../pages/api/wishlist";
import { addItem } from "../../redux/actions/cartActions";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";

interface Props {
  product: Product;
}

const CollectionItem = ({ product }: Props) => {
  const dispatch = useDispatch();

  const uid: string | null =
    useSelector((state: AppState) => state.user.currentUser?.uid) || "";

  const addToWishlist = async () => {
    if (uid) {
      const response = await fetch("/api/wishlist", {
        method: "PUT",
        body: JSON.stringify({
          uid: uid,
          wishlistItem: product.id,
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

  return (
    <div className='group h-96 w-52 flex flex-col items-center relative m-1 cursor-pointer '>
      <Link href={`/shop/products/${product.id}`} passHref>
        <a
          className='hover:opacity-75 w-full h-5/6 bg-cover bg-center mb-1.5 rounded-md'
          style={{ backgroundImage: `url(${product.media?.source})` }}
        />
      </Link>

      <div className='w-full h-1/6 flex justify-between'>
        <div className='w-3/4 flex flex-col items-start justify-evenly'>
          <span className='w-10/12 text-lg leading-4'>{product.name}</span>
          <span className='w-2/12 text-md font-semibold leading-4'>
            {product.price?.formatted_with_symbol}
          </span>
        </div>

        <img
          onClick={addToWishlist}
          className='w-1/8 h-4/6 hover:bg-red-300'
          src='/heart.svg'
        />
      </div>

      <button
        onClick={() => dispatch(addItem(product))}
        className='outline-none opacity-0 group-hover:opacity-95 w-6/12 absolute top-60 bg-gray-800 text-white hover:bg-white hover:text-gray-800 py-2 rounded-md text-base font-regular'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CollectionItem;
