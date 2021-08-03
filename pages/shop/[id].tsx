import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";
import CollectionItem from "../../components/Collection/CollectionItem";
import WishlistIcon from "../../components/WishlistIcon";

const Categories = () => {
  const router = useRouter();
  const { id } = router.query;

  const products = useSelector((state: AppState) => state.shop.products);
  const filteredByCategory: Product[] =
    products?.filter((product: Product) =>
      product.categories?.some((e) => e.slug === id)
    ) ?? [];

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ y: 60, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeIn" },
      }}
      className='flex flex-col w-full h-screen items-center justify-evenly gap-6'
    >
      <div className='flex flex-wrap justify-start items-center gap-12'>
        {products
          ? filteredByCategory.map((product) => (
              <CollectionItem
                key={product.id}
                product={product}
                withWishlist={() => (
                  <WishlistIcon
                    productId={product.id}
                    tailwindClasses='w-1/8 h-4/6 hover:bg-red-300'
                  />
                )}
              />
            ))
          : null}
      </div>
      <Link href='/shop' passHref>
        <a className='text-2xl'> &#10094; Back to Shop</a>
      </Link>
    </motion.div>
  );
};

export default Categories;
