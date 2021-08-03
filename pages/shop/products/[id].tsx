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
    <div className='flex flex-col w-full h-screen items-center justify-center gap-12'>
      {thisProduct ? (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ y: 60, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeIn" },
          }}
          className='h-4/6 w-full flex gap-12 p-6'
        >
          <div className=' h-full w-1/2'>
            <div
              className='w-full h-full bg-contain bg-no-repeat bg-center'
              style={{ backgroundImage: `url(${thisProduct?.media?.source})` }}
            />
          </div>
          <div className='h-full w-1/2 flex flex-col gap-6'>
            <h1
              className='font-light text-7xl'
              dangerouslySetInnerHTML={{ __html: thisProduct?.name || "" }}
            />
            <h2 className='font-semibold text-6xl'>
              {thisProduct?.price?.formatted_with_symbol}
            </h2>
            {thisProduct?.categories?.map((category) => (
              <Link key={category.id} href={`/shop/${category.slug}`} passHref>
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
            <h4
              className='text-2xl'
              dangerouslySetInnerHTML={{
                __html: thisProduct?.description || "This product is very Cool",
              }}
            />
            <div className='flex items-center justify-start'>
              <button
                onClick={() => dispatch(addItem(thisProduct))}
                className='bg-yellow-300 py-3 px-6 rounded-md text-3xl w-1/2'
              >
                Add to Cart
              </button>
              <WishlistIcon
                productId={thisProduct.id}
                tailwindClasses='w-16 h-16 hover:bg-red-300'
              />
            </div>
          </div>
        </motion.div>
      ) : (
        "Something went wrong!"
      )}
      <Link href='/shop'>
        <a className='text-2xl'> &#10094; Back to Shop</a>
      </Link>
    </div>
  );
};
export default ProductDetails;
