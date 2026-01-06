import type { Props } from "../types/model"
const Navbar = ({ children }: Props) => {
    return (
        <nav className="w-auto h-auto p-1">
            {children}
        </nav>
    )
}

export default Navbar