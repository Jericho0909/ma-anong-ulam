interface UlamDescriptionProps {
    ulamDiscription: string;
}

const UlamDescription = ({ ulamDiscription }: UlamDescriptionProps) => {
    return(
        <section className="flex items-center justify-center w-full mb-4 p-1">
            <p className="font-figtree font-semibold text-[clamp(0.90rem,2vw,1.05rem)] text-gray-700">
                {ulamDiscription}
            </p>
        </section>
    )
}

export default UlamDescription