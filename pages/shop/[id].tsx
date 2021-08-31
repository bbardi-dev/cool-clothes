import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
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
    <div className='flex flex-col gap-10 mt-10'>
      <div className='gridding'>
        {products
          ? filteredByCategory.map((product) => (
              <CollectionItem
                key={product.id}
                product={product}
                withWishlist={() => <WishlistIcon productId={product.id} />}
              />
            ))
          : null}
      </div>
      <Link href='/shop' passHref>
        <a className='text-4xl self-center'> &#10094; Back to Shop</a>
      </Link>
    </div>
  );
};

export default Categories;
