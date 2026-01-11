import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSectionInView from "../../hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { MoveRight } from 'lucide-react';

interface MgaUlamProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const MgaUlam = ({setActiveSection}: MgaUlamProps) => {
    const { ref, isVisible } = useSectionInView()
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false)

    useEffect(() => {
        if(isVisible){
            setActiveSection("mgaUlam")
            setHasAnimated(true)
            history.replaceState(null, "", "#mgaUlam")
        }
    }, [isVisible])

    return (
        <motion.section
            id="mgaUlam"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center items-center w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[80vw] xl:w-[70vw] h-[12rem] scroll-mt-10"
        >
            <Link
                to="/mga-ulam/"
                className="flex justify-center items-center font-cabin font-extrabold text-[clamp(1.20rem,2vw,3.50rem) relative inline-block group py-3 w-auto px-2"
            >
                <span
                    className="transition duration-300
                    hoverable:group-hover:scale-125"
                >
                    LISTAHAN NG MGA ULAM
                </span>
                <span
                    className="absolute left-0 top-full
                    flex justify-center items-center
                    transition-all duration-300
                    hoverable:group-hover:scale-125
                    w-full"
                >
                    <MoveRight size={24} color="black"/>
                </span>
            </Link>
        </motion.section>
    )
}

export default MgaUlam