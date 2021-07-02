import { useSelector } from "react-redux";
import CollectionPreview from "../../components/Collection/CollectionPreview";
import { AppState } from "../../redux/types";
import { Category } from "../../utils/types";

const index = () => {
  const categories: Category[] | null =
    useSelector((state: AppState) =>
      state.shop.categories?.filter((category) => category.slug !== "featured")
    ) || [];

  return (
    <div className='flex flex-col'>
      {categories?.map(({ id, ...other }) => (
        <CollectionPreview key={id} category={{ id, ...other }} />
      ))}
    </div>
  );
};

export default index;
