import MaChef from "../assets/images/ma-Image.jpg"
const Header = () => {
    return (
        <div className="flex justify-between items-center w-full border border-black shadow-lg p-2">
            <div className="flex items-center w-auto h-auto p-1">
                <div 
                    className="w-[3rem] h-[4rem]"
                >
                    <img
                        src={MaChef}
                        alt="Mama-Chef-Img"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-auto h-auto p-1 font-cabin">
                    MAMA, ANONG ULAM
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Header