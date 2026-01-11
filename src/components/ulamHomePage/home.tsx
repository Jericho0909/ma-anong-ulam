import { useState, useEffect } from "react";
import useSectionInView from "../../hooks/useIntersectionObserver";
import { motion } from "framer-motion";

import type { UlamItems } from "../../types/model"

interface HomeProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ setActiveSection }: HomeProps) => {
    const { ref, isVisible } = useSectionInView()
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false)

    useEffect(() => {
        if(isVisible){
            setActiveSection("home")
            setHasAnimated(true)
            history.replaceState(null, "", "#home")
        }
    }, [isVisible])
    
    const Ulams: UlamItems[] = [
        {name: "Adobo", style: "rotate-45"},
        {name: "Dinuguan", style: "rotate-180"},
        {name: "Sinigang", style: "rotate-90"},
        {name: "Tinola", style: "scale-105"},
        {name: "Nilaga", style: "-rotate-90"},
        {name: "Pinakbet", style: "-rotate-45"},
        {name: "Bistek Tagalog", style: "scale-105"},
        {name: "Paksiw na isda", style: "rotate-45"},
        {name: "Tortang talong", style: "-rotate-180"},
        {name: "Pritong isda", style: "-rotate-90"},
        {name: "Giniling", style: "-rotate-45"},
        {name: "Bistek Tagalog", style: "rotate-90"},

    ]

    return (
        <motion.section 
            id="home"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-3 lg:grid-cols-4 gap-1 w-[100vw] place-items-center mb-[10rem] scroll-mt-32 h-[85svh] sm:h-[86svh] md:h-[86svh] lg:h-[84svh] xl:h-[85svh] overflow-hidden"
        >  
            {Ulams.map((ulam, index) => (
                <p 
                    key={index}
                    className={`flex items-center justify-center w-auto h-[3rem] p-1 font-quicksand font-semibold text-[clamp(1.05rem,2vw,2rem)] [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] ${ulam.style}`}
                >
                    {ulam.name}
                </p>
            ))}
        </motion.section>
        
    )
}

export default Home