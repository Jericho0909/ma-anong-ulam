import { useState, useEffect } from "react"
import useSectionInView from "../../hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

interface ContactProps {
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const Contact = ({ setActiveSection }: ContactProps) => {
    const { ref, isVisible } = useSectionInView()
    const [ email, setEmail ] = useState<string>("")
    const [ message, setMessage ] = useState<string>("")
    const [ hasAnimated, setHasAnimated ] = useState<boolean>(false)

    const hanleSubmit = (): void => {
        console.log("submit")
    }

     useEffect(() => {
        if(isVisible){
            setActiveSection("contact")
            setHasAnimated(true)
            history.replaceState(null, "", "#contact")
        }
    }, [isVisible])

    return (
        <motion.section
            id="contact"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[80vw] xl:w-[70vw] h-auto p-5 mb-[10rem]"
        >
            <h6 className="font-cabin text-[2rem] font-bold mb-1">
                CONTACT
            </h6>
            <p className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
               May suhestiyon, napansing issue, o gustong idagdag na ulam?
            </p>
            <p className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700 mb-3">
               Iwan mo lang ang mensahe mo at babalikan ka namin sa lalong madaling panahon.
            </p>
            <form 
                onSubmit={() => hanleSubmit()}
                className="flex justify-center items-center flex-col w-full my-[1.50rem]"
            >
                <div className="flex items-center w-full xl:w-[50%]">
                    <label
                        htmlFor="email"
                        className="font-quicksand font-bold pr-1"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-2 p-1 font-figtree text-[clamp(0.90rem,2vw,1.05rem)] text-gray-800 placeholder:text-gray-400 outline-none transition duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 rounded-lg mb-2"
                    />
                </div>
                <div className="w-full xl:w-[50%]">
                    <textarea
                        rows={4}
                        placeholder="Ilagay ang iyong mensahe..."
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-[clamp(0.90rem,2vw,1.05rem)] text-gray-800 placeholder:text-gray-400 outline-none resize-none transition duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200"
                    >

                    </textarea>
                </div>
                <button
                    type="submit"
                    className="font-cabin font-bold rounded-lg bg-green-600 px-6 py-2.5 text-white shadow-sm transition duration-200 hover:bg-green-700 hoverable:hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                    Submit
                </button>
            </form>
            <div className="flex justify-between sm:justify-evenly items-center p-1 mb-2">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    flex flex-col items-center gap-1
                    p-2 rounded-lg transition duration-200
                    hoverable:hover:bg-blue-50 group"
                >
                    <FontAwesomeIcon
                        icon={faFacebook}
                        className="
                        text-blue-600 text-[2rem] transition
                        duration-200 group-hover:scale-110"
                    />
                    <span
                        className="
                        text-[clamp(0.80rem,2vw,1rem)] text-gray-700 transition
                        duration-200 group-hover:text-blue-600
                        "
                    >
                        facebook/maAnongUlam
                    </span>
                </a>
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    flex flex-col items-center gap-1
                    p-2 rounded-lg transition duration-200
                    hoverable:hover:bg-pink-50 group"
                >
                    <FontAwesomeIcon
                        icon={faInstagram}
                        className="
                        text-pink-600 text-[2rem] transition
                        duration-200 group-hover:scale-110"
                    />
                    <span
                        className="
                        text-[clamp(0.80rem,2vw,1rem)] text-gray-700 transition
                        duration-200 group-hover:text-pink-600
                        "
                    >
                        instagram/maAnongUlam
                    </span>
                </a>

            </div>
            <p className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
               Note: Ang app na ito ay nagbibigay lamang ng suggestions at hindi propesyonal na cooking advice.
            </p>
        </motion.section>
    )
}

export default Contact