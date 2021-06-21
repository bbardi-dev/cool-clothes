import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  imgURL?: string;
  size?: string;
  id: string;
};

export default function MenuItem({ title, subtitle, imgURL, size, id }: Props) {
  return (
    <Link href={`/sections/${id}`}>
      <div
        style={size === "large" ? { height: "380px" } : {}}
        className='w-full lg:w-4/12 h-96 flex flex-auto items-center justify-center border-gray-900 border-2 mt-0 mb-4 mx-2 overflow-hidden cursor-pointer first:mr-2 last:ml-2'
      >
        <div
          className='w-full h-full bg-cover bg-center transition duration-6 ease-woo transform hover:scale-1.1'
          style={{
            backgroundImage: `url(${imgURL})`,
          }}
        />
        <div className='h-24 px-0 py-7 flex flex-col items-center justify-center border-gray-700 border-2 bg-pink-200 opacity-75 absolute hover:opacity-90'>
          <h1 className='text-2xl text-indigo-500 font-bold my-0 mx-2'>
            {title}
          </h1>
          <span className='text-lg font-light'>{subtitle}</span>
        </div>
      </div>
    </Link>
  );
}
