import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/types";
import commerce from "../../../utils/CommerceJS/commerce";
import { Category, Product } from "../../../utils/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/actions/cartActions";

const ProductDetail = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <div className='h-4/6 w-full flex gap-24 p-6'>
      <div className=' h-full w-5/12'>
        <div
          className='w-full h-full bg-cover bg-center'
          style={{ backgroundImage: `url(${product?.media?.source})` }}
        />
      </div>
      <div className='h-full w-7/12 flex flex-col gap-6'>
        <h1
          className='font-light text-7xl'
          dangerouslySetInnerHTML={{ __html: product?.name || "" }}
        />
        <h2 className='font-semibold text-6xl'>
          {product?.price?.formatted_with_symbol}
        </h2>
        {product?.categories?.map((category) => (
          <Link href={`/shop/${category.slug}`}>
            <motion.span
              whileHover={{
                color: "#FFF",
              }}
              className='text-lg cursor-pointer'
              key={category.id}
            >
              {category?.name}
            </motion.span>
          </Link>
        ))}
        <h4
          className='text-2xl'
          dangerouslySetInnerHTML={{
            __html: product?.description || "This product is very Cool",
          }}
        />
        <div className='flex items-center justify-start'>
          <button
            onClick={() => dispatch(addItem(product))}
            className='bg-yellow-300 py-3 px-6 rounded-md text-3xl w-1/2'
          >
            Add to Cart
          </button>
          <img className='w-16 h-16' src='/heart.svg' />
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({ paths }: { paths: { id: string } }) => {
  const products = useSelector((state: AppState) => state.shop.products);
  const thisProduct: Product | null =
    products?.filter((product: Product) => product.id === paths.id)[0] ?? null;

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center gap-12'>
      {thisProduct ? (
        <ProductDetail product={thisProduct} />
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

export const getStaticPaths = async () => {
  const { data: products } = await commerce.products.list({ limit: 200 });

  const paths = products.map((product: Product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const id = ctx.params?.id;

  return {
    props: {
      paths: { id },
    },
  };
};
