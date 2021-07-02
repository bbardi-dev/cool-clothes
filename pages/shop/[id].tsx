import { GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import commerce from "../../utils/CommerceJS/commerce";
import { Category, Product } from "../../utils/types";
import CollectionItem from "../../components/Collection/CollectionItem";
import Link from "next/link";

const Categories = ({ paths }: { paths: { id: string } }) => {
  const products = useSelector((state: AppState) => state.shop.products);
  const filteredByCategory: Product[] =
    products?.filter((product: Product) =>
      product.categories?.some((e) => e.slug === paths.id)
    ) ?? [];

  return (
    <>
      <div className='flex flex-wrap justify-evenly'>
        {products
          ? filteredByCategory.map((product) => (
              <CollectionItem key={product.id} product={product} />
            ))
          : null}
      </div>
      <Link href='/shop'>
        <a className='text-2xl'> &#10094; Back to Shop</a>
      </Link>
    </>
  );
};

export const getStaticPaths = async () => {
  const { data: categories } = await commerce.categories.list();

  const paths = categories.map((category: Category) => ({
    params: { id: category.slug },
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

export default Categories;
