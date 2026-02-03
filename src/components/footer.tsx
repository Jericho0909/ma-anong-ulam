
import MaChef from "../assets/images/ma-Image.jpg"
import { Mail } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
    return (
        <footer
            className="flex flex-col gap-3 md:flex-row md:justify-between md:items-centerp-3 border border-black shadow-lg z-10 py-2"
        >
        <div className="flex justify-center md:justify-start md:flex-1">
            <img
                src={MaChef}
                alt="Ma-Chef-Icon"
                className="w-[2.5rem] h-[2.5rem]"
            />
        </div>

        <div className="flex items-center justify-center text-center md:text-center md:flex-1">
            <p className="font-cabin text-xs">
            © 2025 PlayPot. All rights reserved.
            </p>
        </div>

        <div className="flex flex-col items-center md:items-end md:flex-1 gap-1 w-auto">
            <div className="flex items-center gap-1">
            <Mail size={14} />
            <p className="font-cabin text-xs">
                maAnoUlam142@gmail.com
            </p>
            </div>

            <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faPhone} className="text-xs" />
            <p className="font-cabin text-xs">
                09123456789
            </p>
            </div>
        </div>
    </footer>
    )
}

export default Footer