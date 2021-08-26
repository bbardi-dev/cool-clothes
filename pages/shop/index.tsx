import { useSelector } from "react-redux";
import Link from "next/link";
import { AppState } from "../../redux/types";
import { Category } from "../../utils/types";

const index = () => {
  const categories: Category[] | null =
    useSelector((state: AppState) =>
      state.shop.categories?.filter((category) => category.slug !== "featured")
    ) || [];

  return (
    <div className='shop-page mt-8'>
      {categories?.map((category) => (
        <Link key={category.id} href={`/shop/${category.slug}`} passHref>
          <a className='my-4'>
            <div
              className='w-full h-72 md:h-80 lg:h-96 bg-cover bg-no-repeat bg-center rounded-sm'
              style={{ backgroundImage: `url(${category.assets[0].url})` }}
            />
            <span className='w-full flex justify-center bg-gray-800 text-white text-4xl font-semibold rounded-sm'>
              {category.name}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default index;
