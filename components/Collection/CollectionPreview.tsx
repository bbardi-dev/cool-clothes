import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import getCommerce from "../../utils/CommerceJS/commerce";
import { Category, Product } from "../../utils/types";
import CollectionItem from "./CollectionItem";

interface Props {
  category: Category;
}

export default function CollectionPreview({ category }: Props) {
  const products = useSelector((state: AppState) => state.shop.products);
  const showcaseProducts: Product[] =
    products
      ?.filter((product: Product) =>
        product.categories?.some((e) => e.name === category.name)
      )
      .splice(0, 4) ?? [];

  return (
    <>
      {products ? (
        <div className='flex flex-col mb-8'>
          <Link href={`/shop/${category.slug}`}>
            <motion.h1
              whileHover={{ scale: 1.2, originX: 0 }}
              className='text-xl mb-6 cursor-pointer'
            >
              {category?.name?.toUpperCase()} &#10095;
            </motion.h1>
          </Link>
          <div className='flex flex-wrap justify-evenly'>
            {showcaseProducts.map((product) => (
              <CollectionItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        "Something went wrong"
      )}
    </>
  );
}
