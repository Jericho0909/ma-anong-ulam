import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Main from "../components/main"
import BackButton from "../components/backbutton"
import SangkapImg from "../assets/images/sangkap.png"
const DetalyeNgUlam = () => {
    const navigate = useNavigate()

    const handleBackToMgaUlam = (): void => {
        navigate("/mga-ulam/")
    }

    return (
        <>
            <Header
                icon={SangkapImg}
                title="Ang Mga Sangkap"
            >
                <BackButton
                    handleBack={handleBackToMgaUlam}
                />
            </Header>
            <Main>
                <div>
                    hi
                </div>
            </Main>
        </>
    )
}

export default DetalyeNgUlam