import type { ReactNode } from "react";

interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <main className="mt-[6.50rem] p-2 overflow-x-hidden">
            {children}
            
        </main>
    )
}

export default Main