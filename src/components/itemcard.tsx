import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UlamTypes } from "../types/model"
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

interface ItemCardProps {
    ulam: UlamTypes;
}

const ItemCard = ({ulam}: ItemCardProps) => {
    const navigate = useNavigate()
    const [ imgLoaded, setImgLoaded ] = useState(false)
    const [ ref, entry ] = useIntersectionObserver({
        threshold: 0,
        root: null,
        rootMargin: "0px",
    })

    const isVisible = entry?.isIntersecting

    const toDetalyengUlam = (id: number, name: string): void => {
        navigate(`/detalyengulam/${id}/${name}`)
    }
    return (
        <div 
            ref={ref}
            className="group w-full h-[18rem] lg:h-[21.20rem] p-2 bg-white rounded-2xl overflow-hidden border border-black shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => toDetalyengUlam(ulam.id, ulam.name)}
        >
            <div className="relative w-full h-[15rem] lg:h-[18rem] overflow-hidden rounded-md mb-2 group">
                {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                {isVisible && (
                    <motion.img
                        src={ulam.image}
                        alt={`${ulam.name}-img`}
                        loading="lazy"
                        onLoad={() => setImgLoaded(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span
                className="block w-full font-quicksand font-bold truncate"
            >
                {ulam.name}
            </span>
        </div>
    )
}

export default ItemCard