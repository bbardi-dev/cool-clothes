import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/types";
import commerce from "../../../utils/CommerceJS/commerce";
import { Category, Product } from "../../../utils/types";
import Link from "next/link";

const ProductDetail = ({ product }: { product: Product | null }) => {
  return (
    <div className=' w-3/12 flex flex-col h-96 items-center relative m-1'>
      <h1 dangerouslySetInnerHTML={{ __html: product?.name || "" }} />
      <div
        className=' w-full h-5/6 bg-cover bg-center mb-1.5'
        style={{ backgroundImage: `url(${product?.media?.source})` }}
      />
      <h2 dangerouslySetInnerHTML={{ __html: product?.description || "" }} />
      {product?.categories?.map((category) => (
        <p key={category.id}>{category?.name}</p>
      ))}
      <h4>{product?.price?.formatted_with_symbol}</h4>
      <h4>{product?.quantity}</h4>
    </div>
  );
};

const ProductDetails = ({ paths }: { paths: { id: string } }) => {
  const products = useSelector((state: AppState) => state.shop.products);
  const thisProduct: Product | null =
    products?.filter((product: Product) => product.id === paths.id)[0] ?? null;

  return (
    <>
      <ProductDetail product={thisProduct} />
      <Link href='/shop'>
        <a>&larr; Back to Shop</a>
      </Link>
    </>
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
