interface UlamStepProps {
    ulamStep: string[];
}

const UlamStep = ({ulamStep}: UlamStepProps) => {
    return (
        <section className="flex items-start justify-center flex-col w-full sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[60%] mb-4 px-3 py-1">
            <span className="text-[clamp(1.10rem,2vw,1.30rem) font-quicksand font-bold [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] mb-2">
                HAKBANG NG TAMANG PAGLULUTO
            </span>
            <ul
                className="space-y-1 list-disc pl-5"
            >
                {ulamStep.map((step, index) => (
                    <li
                        key={index}
                        className="font-figtree font-semibold text-[clamp(1rem,0.90vw,1.10rem)] text-gray-700"
                    >
                        {step}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UlamStep