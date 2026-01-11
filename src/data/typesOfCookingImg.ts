import DC1 from "../assets/images/DC1.jpg"
import DC2 from "../assets/images/DC2.jpg"
import DC3 from "../assets/images/DC3.jpg"
import DC4 from "../assets/images/DC4.jpg"
import DC5 from "../assets/images/DC5.jpg"
import DC6 from "../assets/images/DC6.jpg"
import DC7 from "../assets/images/DC7.jpg"
import DC8 from "../assets/images/DC8.jpg"
import MHC1 from "../assets/images/MHS1.jpg"
import MHC2 from "../assets/images/MHS2.jpg"
import MHC3 from "../assets/images/MHS3.jpg"
import MHC4 from "../assets/images/MHS4.jpg"
import MHC5 from "../assets/images/MHS5.jpg"
import MHC6 from "../assets/images/MHS6.jpg"
import MHC7 from "../assets/images/MHS7.jpg"
import MHC8 from "../assets/images/MHS8.jpg"
import CM1 from "../assets/images/CM1.jpg"
import CM2 from "../assets/images/CM2.jpg"
import CM3 from "../assets/images/CM3.jpg"
import CM4 from "../assets/images/CM4.jpg"


const TypesOfCooking = () => {
    const DryHeatCookingImg: string[] = [
        DC1,
        DC2,
        DC3,
        DC4,
        DC5,
        DC6,
        DC7,
        DC8,
    ]

    const MoistHeatCookingImg: string[] = [
        MHC1,
        MHC2,
        MHC3,
        MHC4,
        MHC5,
        MHC6,
        MHC7,
        MHC8,
    ]

    const CombinationModernCookingImg: string[] = [
        CM1,
        CM2,
        CM3,
        CM4,
    ]

    return {
        DryHeatCookingImg,
        MoistHeatCookingImg,
        CombinationModernCookingImg
    }
}

export default TypesOfCooking