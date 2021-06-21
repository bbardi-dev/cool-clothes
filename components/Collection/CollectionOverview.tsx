import { Category } from "../../utils/types";
import CollectionPreview from "./CollectionPreview";

interface Props {
  categories: Category[];
}

function CollectionOverview({ categories }: Props) {
  return (
    <div className='flex flex-col'>
      {categories?.map(({ id, ...other }) => (
        <CollectionPreview key={id} category={{ id, ...other }} />
      ))}
    </div>
  );
}

export default CollectionOverview;
