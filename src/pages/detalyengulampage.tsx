import { useContext, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import FirebaseDatabaseContext from "../context/firebaseDatabaseContext"
import Header from "../components/header"
import Main from "../components/main"
import Footer from "../components/footer"
import UlamName from "../components/detalyengUlamPage/section/ulamName"
import UlamImage from "../components/detalyengUlamPage/section/ulamImage"
import UlamDescription from "../components/detalyengUlamPage/section/ulamDescription"
import UlamCookingTime from "../components/detalyengUlamPage/section/ulamCookingTime"
import UlamDifficulty from "../components/detalyengUlamPage/section/ulamDifficulty"
import UlamSangkap from "../components/detalyengUlamPage/section/ulamSangkap"
import UlamOptionalSangkap from "../components/detalyengUlamPage/section/ulamOptionalSangkap"
import UlamStep from "../components/detalyengUlamPage/section/ulamStep"
import Textmarquee from "../components/detalyengUlamPage/section/textMarquee"
import BackButton from "../components/backbutton"
import SangkapImg from "../assets/images/sangkap.png"
const DetalyeNgUlam = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { id } = useParams()
    const { mgaUlam } = useContext(FirebaseDatabaseContext)
    const ulam = mgaUlam.data.find(ulam => ulam.id === Number(id))

    const handleBackToMgaUlam = (): void => {
        navigate(-1)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    if(!ulam) return

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
                <UlamName
                    ulamName={ulam.name}
                />
                <UlamImage
                    img={ulam.image}
                    ulamName={ulam.name}
                />
                <UlamDescription
                    ulamDiscription={ulam.description}
                />
                <UlamCookingTime
                    ulamCookingTime={ulam.cookTime}
                />
                <UlamDifficulty
                    ulamDifficulty={ulam.difficulty}
                />
                <UlamSangkap
                    ulamSangkap={ulam.ingredients}
                />
                <UlamOptionalSangkap
                    ulamOptionalSangkap={ulam.optionalIngredients}
                />
                <UlamStep
                    ulamStep={ulam.steps}
                />
                <Textmarquee
                    mgaUlam={mgaUlam}
                    mainSangkap={ulam.mainIngredient}
                />
            </Main>
            <Footer/>
        </>
    )
}

export default DetalyeNgUlam