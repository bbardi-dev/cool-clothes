import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

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
            <div className='relative w-full h-72 md:h-80 lg:h-96 rounded-sm'>
              <Image
                src={category.assets[0].url || ""}
                layout='fill'
                quality={100}
                objectFit='cover'
                placeholder='blur'
                blurDataURL={category.assets[0].url || ""}
              />
            </div>
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
