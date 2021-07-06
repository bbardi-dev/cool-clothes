import { useSelector } from "react-redux";
import Link from "next/link";
import prisma from "../prisma/prisma";
import { updateProducts } from "../redux/actions/shopActions";
import { wrapper } from "../redux/store";
import { AppState } from "../redux/types";
import commerce from "../utils/CommerceJS/commerce";
import { Product } from "../utils/types";
import CollectionItem from "../components/Collection/CollectionItem";
import { motion } from "framer-motion";

export default function Home() {
  const products: Product[] | null = useSelector(
    (state: AppState) =>
      state.shop.products?.filter((product) =>
        product.categories?.some((category) => category.slug === "featured")
      ) || null
  );
  return (
    <motion.main
      exit={{ opacity: 0 }}
      initial={{ y: 60, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeIn" },
      }}
      className='flex flex-col justify-center items-center h-full w-full md:w-10/12 mx-auto mt-24 gap-36'
    >
      <div className='flex flex-col justify-items-center items-center gap-24 text-center'>
        <h1 className='italic text-7xl'>Do you want to look...</h1>
        <span className='cool font-hand text-9xl'>Cool?</span>
        <p className='main-subt text-2xl'>You've come to the right place.</p>
        <Link href='/shop'>
          <button className='bg-yellow-300 py-3 px-6 rounded-md text-3xl'>
            See our Collection
          </button>
        </Link>
      </div>

      <div className='flex flex-col items-center mt-30'>
        <h2 className='featured-title text-2xl mb-8 font-semibold'>
          Featured Products
        </h2>
        <div className='flex flex-col md:flex-row gap-12'>
          {products &&
            products.map((product) => (
              <CollectionItem key={product.id} product={product} />
            ))}
        </div>
      </div>
    </motion.main>
  );
}
