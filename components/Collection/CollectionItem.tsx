import Link from "next/link";
import Image from "next/image";
import { Product } from "../../utils/types";

const CollectionItem = ({
  product,
  withWishlist,
}: {
  product: Product;
  withWishlist?: () => JSX.Element;
}) => {
  return (
    <div className='group h-96 w-52 flex flex-col items-center relative m-1 '>
      <Link href={`/shop/products/${product.id}`} passHref>
        <a className='hover:opacity-75 w-full h-5/6 mb-1.5 rounded-sm cursor-pointer relative'>
          <Image
            src={product.media?.source || ""}
            layout='fill'
            quality={100}
            priority
            objectFit='cover'
            placeholder='blur'
            blurDataURL={product.media?.source || ""}
          />
        </a>
      </Link>

      <div className='w-full h-1/6 flex justify-between'>
        <div className='w-3/4 flex flex-col items-start justify-evenly'>
          <span className='w-10/12 text-lg leading-4'>{product.name}</span>
          <span className='w-2/12 text-md font-semibold leading-4'>
            {product.price?.formatted_with_symbol}
          </span>
        </div>

        {withWishlist?.()}
      </div>
    </div>
  );
};

export default CollectionItem;
