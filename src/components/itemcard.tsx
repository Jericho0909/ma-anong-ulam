import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SaveScrollPositionContext from "../context/saveScrollPositionContext";
import type { UlamTypes } from "../types/model"
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

interface ItemCardProps {
    ulam: UlamTypes;
    ulamRefs: React.RefObject<Record<string, HTMLDivElement | null>>
}

const ItemCard = ({ulam, ulamRefs}: ItemCardProps) => {
    const navigate = useNavigate()
    const { saveId, 
        retrieveId,
        id, 
        setId,
        isScrollActive,
        setIsScrollActive,
    } = useContext(SaveScrollPositionContext)
    const [searchParams] = useSearchParams()
    const [ imgLoaded, setImgLoaded ] = useState(false)
    const [ ref, entry ] = useIntersectionObserver({
        threshold: 0,
        root: null,
        rootMargin: "0px",
    })

    const isVisible = entry?.isIntersecting

    const toDetalyengUlam = (id: number, name: string): void => {
         navigate({
            pathname: `/detalyengulam/${id}/${name}`,
            search: searchParams.toString(),
        })
    }

    const scrollToUlam = (id:number): void => {
        ulamRefs.current[String(id)]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }

    useEffect(() => {
        if (!isScrollActive) return

        const savedId = retrieveId()
        if (savedId < 0) return

        scrollToUlam(savedId)

        const timer = setTimeout(() => {
            setIsScrollActive(false)
        }, 400)

        return () => clearTimeout(timer)
     }, [isScrollActive])

     useEffect(() => {
        if (id < 0) return

        const timer = setTimeout(() => {
            setId(-1)
        }, 2500)

        return () => clearTimeout(timer)
    }, [id])

    return (
        <div 
            ref={(el) => {
                ulamRefs.current[String(ulam.id)] = el
            }}
            className={`group w-full h-[18rem] lg:h-[21.20rem] p-2 bg-white rounded-2xl overflow-hidden border border-black shadow-md transition-all duration-300 hover:shadow-lg hoverable:hover:-translate-y-1 cursor-pointer
                ${ulam.id === id
                    ? "ulam-active"
                    : ""
                }
            `}
            onClick={() => {
                toDetalyengUlam(ulam.id, ulam.name)
                saveId(ulam.id)
            }}
        >
            <div 
                ref={ref}
                className="relative w-full h-[15rem] lg:h-[18rem] overflow-hidden rounded-md mb-2 group"
            >
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