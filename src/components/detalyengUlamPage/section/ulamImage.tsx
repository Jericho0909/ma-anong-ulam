import { useState } from "react";

interface UlamImageProps {
    img: string;
    ulamName: string;
}

const UlamImage = ({ img, ulamName }: UlamImageProps) => {
    const [ imgLoaded, setImgLoaded ] = useState<boolean>(false)
    return (
        <section className="flex items-center justify-center w-full mb-4 p-1">
            <div className="relative w-[33rem] h-[20rem] overflow-hidden rounded-lg shadow-lg">
                {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <img
                    src={img}
                    alt={ulamName}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    )
}

export default UlamImage