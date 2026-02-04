import { useState, useEffect } from "react"
import useSectionInView from "../../../hooks/useIntersectionObserver";
import { motion } from "framer-motion";

interface AboutProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const About = ({ setActiveSection }: AboutProps) => {
    const { ref, isVisible } = useSectionInView()
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false)

    useEffect(() => {
        if(isVisible){
            setActiveSection("about")
            setHasAnimated(true)
            history.replaceState(null, "", "#about")
        }
    }, [isVisible])

    return(
        <motion.section
            id="about"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[80vw] xl:w-[70vw] h-auto p-5 mb-[10rem]"
        >
            <h6 className="font-cabin text-[2rem] font-bold mb-1">
                ABOUT
            </h6>
            <p className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
                <span className="font-semibold text-green-600 pr-1">
                    Ma, anong ulam?
                </span> 
                    ay isang web application na tumutulong sa mga 
                <span className="italic text-gray-900 px-1">
                    INA
                </span> 
                    na
                <span className="font-extrabold text-gray-900 px-1">
                    maghanap ng mga posibleng lutuin
                </span> 
                base sa mga sangkap na meron sila.
            </p>
            <p className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
                Sa app na ito, puwedeng mag-input ang user ng kanilang sariling
                <span className="font-semibold text-gray-900 pl-1">ingredients</span>, at
                <span className="font-extrabold text-gray-900 px-1">
                    makikita agad ang listahan ng mga pagkain
                </span>
                na pwedeng gawin.
            </p>
            <p className="font-cabin text-[1.15rem] font-extrabold mb-1">
                Layunin ng proyektong ito na:
            </p>
            <ul className="space-y-2 list-disc pl-5">
                <li className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
                   Gawing mas madali ang meal planning: hindi na kailangang mag-isip ng kung ano ang lulutuin kada araw.
                </li>
                <li className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
                   Maiwasan ang pagsasayang ng pagkain: gamit ang ingredients na mayroon, puwede pa ring makagawa ng masarap na ulam.
                </li>
            </ul>
            <p className="font-figtree font-semibold text-[clamp(1rem,0.90vw,1.10rem05 text-gray-700 mt-4">
                Nakatuon ang app sa pagkaing Pilipino, kaya makakakita ang user ng mga lutong-bahay na recipe na <span className="font-extrabold text-gray-900">simple, masarap, at madaling sundan</span>.
            </p>
            <p className="font-figtree font-semibold text-[clamp(1rem,0.90vw,1.10rem05 text-gray-700 mb-1">
                Sa huli, ang layunin ng app na ito ay masagot ang pinakakaraniwang tanong sa bawat tahanan: <span className="font-semibold text-green-600 pr-1">
                    Ma, anong ulam?
                </span> 
            </p>
        </motion.section>
    )
}

export default About