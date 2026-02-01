import { ArrowBigRight } from 'lucide-react';
interface BackButtonProps {
    handleBack: () => void;
}


const BackButton = ({ handleBack }: BackButtonProps) => {
    return(
        <button
            type="button"
            className="
                w-auto h-auto p-1 transition-transform duration-300
                hoverable:hover:scale-110 hoverable:hover:shadow-lg
                hoverable:hover:bg-green-100 rounded-full
            "
            onClick={() => handleBack()}
        >
            <ArrowBigRight
                size={46}
                color="#16A34A"
                className="transition-colors duration-300 hoverable:hover:text-green-700"
            />
        </button>
    )
}

export default BackButton