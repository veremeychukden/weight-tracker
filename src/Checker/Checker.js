import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Select, Slider} from "antd";
import {Option} from "antd/es/mentions";
import productService from "../services/productService";
import productStore from "../stores/productStore";
import Zoom from "react-reveal/Zoom";
import checker from "../images/checker.svg";


const Checker = observer(() => {

    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(170);

    const handlerGenderSelect = value => {
        setGender(value);
        console.log(value);
    }

    const handlerHeightSlider = value => {
        setHeight(value);
        console.log(value);
    }

    const setIdealWeight = async () => {
        await productService.getIdealWeight(gender, height);
        var h = document.getElementById('miller');
        h.innerHTML = productStore.idealWeight.Miller;
        console.log(productStore.idealWeight.Miller);
    }

    return(
        <div className="checker w-screen bg-cyan-light min-h-screen">
            <div className="container h-screen mx-auto grid-cols-2 gap-10 pt-28">
                <h2>Select your gender:</h2>
                <Select defaultValue="male" style={{ width: 120 }} onChange={handlerGenderSelect}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
                <h2>Your height(cm):</h2>
                <div className="w-32">
                    <Slider defaultValue={170} tooltipVisible max={230} min={130} onChange={handlerHeightSlider}/>
                </div>
                <button
                    className="bg-blue-light hover:bg-sky-light text-white font-bold py-2 px-4 rounded-full"
                    onClick={async () => await setIdealWeight()}
                >
                    Check my ideal weight
                </button>
                <h2 id="miller">Press the check button</h2>

            </div>

        </div>
    )
})

export default Checker;