import type { ReactNode } from "react";

interface FooterProps {
    children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default Footer