import type { ReactNode } from "react";

interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <main className="flex items-center justify-start flex-col w-full min-h-[80svh] mt-[6rem] overflow-hidden">
            {children}
            
        </main>
    )
}

export default Main