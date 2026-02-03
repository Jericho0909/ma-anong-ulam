import { useNavigate } from "react-router-dom";
import type { DataList, UlamTypes } from "../../../types/model";

interface TextMarqueeProps {
  mgaUlam: DataList<UlamTypes>;
  mainSangkap: string;
}

const TextMarquee = ({ mgaUlam, mainSangkap }: TextMarqueeProps) => {
    const navigate = useNavigate()
    const ulams = mgaUlam.data.filter(
        (item) => item.mainIngredient === mainSangkap
    )

    const toDetalyengUlam = (id: number, name: string): void => {
        navigate({
            pathname: `/detalyengulam/${id}/${name}`,
        })
    }

    if (ulams.length === 0) return null

  return (
    <section className="w-screen overflow-hidden mb-6">
        <p className="text-center text-[clamp(1.10rem,2vw,1.30rem)]
            font-quicksand font-bold mb-3
            [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)]">
            MAY IBA KA PANG PWEDENG SUBUKAN NA ULAM GAMIT ANG MAIN INGREDIENT!
        </p>
        <p className="text-center text-[clamp(0.80rem,2vw,0.90rem)] font-quicksand font-semibold mb-3 italic text-gray-600">
            Note: pindutin mo lang ang pangalan ng 
            <span className="text-FGulay font-bold uppercase tracking-wider pl-1">
                ULAM
            </span>
        </p>

        <div className="overflow-hidden p-3 cursor-pointer ">
            <div className="marquee-smooth flex whitespace-nowrap">
                {ulams.map((item) => (
                    <span
                        key={item.id}
                        className="mx-14 flex-shrink-0 text-FGulay
                        text-[clamp(1.5rem,2vw,1.20rem)]font-quicksand font-bold [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] cursor-pointer"
                        onClick={() => toDetalyengUlam(item.id, item.name)}
                    >
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    </section>
  )
}

export default TextMarquee;
