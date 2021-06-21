import MenuItem from "./MenuItem";

export type Section = {
  title: string;
  subtitle: string;
  imgURL?: string;
  size?: string;
  id: string;
};

export default function Directory({ sections }: { sections: Section[] }) {
  return (
    <div className='w-full flex flex-wrap justify-between'>
      {sections.length > 0 &&
        sections.map(({ id, ...props }: Section) => (
          <MenuItem key={id} id={id} {...props} />
        ))}
    </div>
  );
}
