import type { ReactNode } from "react";

interface HeaderProps {
    icon: string,
    title: string,
    children: ReactNode;
}

const Header = ({ icon, title, children }: HeaderProps) => {
    return (
        <div className="fixed top-0 flex justify-between items-center w-full bg-white border border-black shadow-lg p-2 z-10">
                <div className="flex items-center w-auto h-auto p-1 gap-1 cursor-pointer">
                    <div 
                        className="w-[3rem] h-[4rem]"
                    >
                        <img
                            src={icon}
                            alt={`${title}-Icon`}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-auto h-auto p-1 font-cabin text-[clamp(1rem,2vw,1.10rem)]">
                        {title}
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto p-1">
                    <>
                        {children}
                    </>
                </div>
        </div>
    )
}

export default Header