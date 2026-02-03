interface UlamNameProps {
    ulamName: string;
}

const UlamName = ({ ulamName }: UlamNameProps) => {
    return(
        <section className="flex items-center justify-center w-full mb-4 p-1">
            <span className="text-[clamp(2rem,3vw,3rem)] font-quicksand font-bold [text-shadow:1px_1px_4px_rgba(0,0,0,0.9)]">
                {ulamName}
            </span>
        </section>
    )
}

export default UlamName