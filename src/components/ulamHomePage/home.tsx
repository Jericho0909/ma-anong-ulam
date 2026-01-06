import type { UlamItems } from "../../types/model"

const Home = () => {
    
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
        <section
            id="home"
            className="grid grid-cols-3 lg:grid-cols-4 gap-1 w-[100vw] h-[85svh] xl:h-[80svh] p-5  place-items-center mb-[5rem]"
        >
            {Ulams.map((ulam, index) => (
                <p 
                    key={index}
                    className={`flex items-center justify-center w-auto h-[3rem] p-1 font-quicksand font-semibold text-[clamp(1.05rem,2vw,2rem)] [text-shadow:1px_1px_4px_rgba(0,0,0,0.5)] ${ulam.style}`}>
                    {ulam.name}
                </p>
            ))}
        </section>
        
    )
}

export default Home