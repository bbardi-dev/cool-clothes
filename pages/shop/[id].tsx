import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AppState } from "../../redux/types";
import { Product } from "../../utils/types";
import CollectionItem from "../../components/Collection/CollectionItem";
import { useRouter } from "next/router";

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
              <CollectionItem key={product.id} product={product} />
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
