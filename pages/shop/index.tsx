import { GetStaticProps } from "next";
import { useSelector } from "react-redux";
import CollectionOverview from "../../components/Collection/CollectionOverview";
import CollectionPreview from "../../components/Collection/CollectionPreview";
import { AppState } from "../../redux/types";
import commerce from "../../utils/CommerceJS/commerce";
import { Category } from "../../utils/types";

const index = () => {
  const categories: Category[] | null =
    useSelector((state: AppState) =>
      state.shop.categories?.filter((category) => category.slug !== "featured")
    ) || [];

  return (
    <div className='shop-page'>
      <CollectionOverview categories={categories} />
    </div>
  );
};

export default index;
