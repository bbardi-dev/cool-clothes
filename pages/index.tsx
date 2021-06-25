import { useSelector } from "react-redux";

import prisma from "../prisma/prisma";
import { updateProducts } from "../redux/actions/shopActions";
import { wrapper } from "../redux/store";
import { AppState } from "../redux/types";
import commerce from "../utils/CommerceJS/commerce";
import { Product } from "../utils/types";

export default function Home() {
  const products: Product[] | null = useSelector(
    (state: AppState) => state.shop.products
  );
  return (
    <div>
      <main>
        <div className='flex flex-col justify-center items-center w-full md:w-10/12 h-full mx-auto'>
          YOO
        </div>
      </main>
    </div>
  );
}
