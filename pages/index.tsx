import Link from "next/link";
import { useSelector } from "react-redux";
import { AppState } from "../redux/types";
import { Product } from "../utils/types";
import CollectionItem from "../components/Collection/CollectionItem";
import WishlistIcon from "../components/WishlistIcon";

export default function Home() {
  const products: Product[] | null = useSelector(
    (state: AppState) =>
      state.shop.products?.filter((product) =>
        product.categories?.some((category) => category.slug === "featured")
      ) || null
  );
  return (
    <main className='flex flex-col h-full w-full md:w-10/12 mx-auto mt-24 gap-36'>
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

      <div className='flex flex-col mt-30'>
        <h2 className='featured-title text-2xl mb-8 font-semibold self-center'>
          Featured Products
        </h2>
        <div className='gridding'>
          {products &&
            products.map((product) => (
              <CollectionItem
                key={product.id}
                product={product}
                withWishlist={() => <WishlistIcon productId={product.id} />}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
