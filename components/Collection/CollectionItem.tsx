import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actions/cartActions";
import { Product } from "../../utils/types";

interface Props {
  product: Product;
}

const CollectionItem = ({ product }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className='group w-3/12 flex flex-col h-96 items-center relative m-1'>
      <div
        className='group-hover:opacity-75 w-full h-5/6 bg-cover bg-center mb-1.5'
        style={{ backgroundImage: `url(${product.media?.source})` }}
      />

      <div className='w-full h-1/6 flex justify-between text-md'>
        <span className='w-10/12 mb-4'>{product.name}</span>
        <span className='w-2/12'>{product.price?.formatted_with_symbol}</span>
      </div>
      <Link href={`/shop/products/${product.id}`}>
        <a className='text-center opacity-0 group-hover:opacity-90 w-8/12 absolute top-48 bg-gray-900 text-pink-100 hover:bg-pink-100 hover:text-gray-900 py-1 rounded-md uppercase text-lg font-semibold'>
          Details
        </a>
      </Link>
      <button
        onClick={() => dispatch(addItem(product))}
        className='opacity-0 group-hover:opacity-90 w-8/12 absolute top-60 bg-gray-900 text-pink-100 hover:bg-pink-100 hover:text-gray-900 py-1 rounded-md uppercase text-lg font-semibold'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CollectionItem;
