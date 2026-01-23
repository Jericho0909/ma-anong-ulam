

interface  GridGalleryProps {
  imgArr: string[];
  bg: string
}

const  GridGallery = ({ imgArr, bg }:  GridGalleryProps) => {
    return (
    <div
        className={`grid grid-cols-2 sm:grid-cols-4 gap-4 w-[80%] lg:w-[45%] h-auto place-items-center p-2 mb-[3rem] border border-t border-black rounded-b-xl shadow-xl
            ${bg}
        `}
    >
      {imgArr.map((img, i) => (
        <img
            key={i}
            src={img}
            alt={`img-${i}`}
            className="w-[8rem] h-full object-fill rounded-lg border border-black shadow-xl"
        />
      ))}
    </div>
  );
    
}

export default  GridGallery;
