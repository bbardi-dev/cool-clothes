import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AppState } from "../../../redux/types";
import { addItem } from "../../../redux/actions/cartActions";
import { Product } from "../../../utils/types";
import WishlistIcon from "../../../components/WishlistIcon";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const products = useSelector((state: AppState) => state.shop.products);
  const thisProduct: Product | null =
    products?.filter((product: Product) => product.id === id)[0] ?? null;

  return (
    <div className='h-full w-full md:h-screen md:mt-10 flex flex-col items-center justify-center gap-24'>
      {thisProduct ? (
        <div className='h-5/6 w-full grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8'>
          <div
            className='w-full h-full bg-cover bg-no-repeat bg-center'
            style={{ backgroundImage: `url(${thisProduct?.media?.source})` }}
          />

          <div className='flex flex-col justify-center gap-6'>
            <h1
              className='font-light text-5xl md:text-7xl'
              dangerouslySetInnerHTML={{ __html: thisProduct?.name || "" }}
            />
            <h2 className='font-semibold text-4xl md:text-6xl'>
              {thisProduct?.price?.formatted_with_symbol}
            </h2>
            <div className='flex gap-4'>
              {thisProduct?.categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  passHref
                >
                  <motion.a
                    whileHover={{
                      color: "#FFF",
                    }}
                    className='text-lg cursor-pointer'
                  >
                    {category?.name}
                  </motion.a>
                </Link>
              ))}
            </div>
            <h4
              className='text-xl md:text-2xl'
              dangerouslySetInnerHTML={{
                __html: thisProduct?.description || "This product is very Cool",
              }}
            />
            <div className='flex items-center justify-between'>
              <button
                onClick={() => dispatch(addItem(thisProduct))}
                className='bg-yellow-300 py-3 px-6 rounded-md text-3xl w-1/2'
              >
                Add to Cart
              </button>
              <WishlistIcon
                productId={thisProduct.id}
                tailwindClasses='w-16 h-16'
              />
            </div>
          </div>
        </div>
      ) : (
        "Something went wrong!"
      )}
      <Link href='/shop'>
        <motion.a
          whileHover={{ scale: 1.2, originX: 0 }}
          className='text-4xl cursor-pointer'
        >
          &#10094; Back to Shop
        </motion.a>
      </Link>
    </div>
  );
};
export default ProductDetails;
