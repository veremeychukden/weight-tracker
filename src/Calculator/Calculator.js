import {observer} from "mobx-react-lite";
import productStore from "../stores/productStore";
import axios from "axios";
import {useEffect, useState} from "react";
import productService from "../services/productService";
import { Slider, Select } from 'antd';
import {Option} from "antd/es/mentions";
import Zoom from "react-reveal/Zoom";
import userStore from "../stores/userStore";

const Calculator = observer(() => {

    useEffect(() => {
        productService.getProducts()
    }, []);

    const [age, setAge] = useState(18);
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);

    const handlerAgeSlider = value => {
        setAge(value);
        console.log(value);
    }

    const handlerGenderSelect = value => {
        setGender(value);
        console.log(value);
    }

    const handlerHeightSlider = value => {
        setHeight(value);
        console.log(value);
    }

    const handlerWeightSlider = value => {
        setWeight(value);
        console.log(value);
    }

    const setDailyCalories = async () => {
        await productService.getDailyCaloriesRequirements(age, gender, height,weight, 'level_1');
        var h = document.getElementById('bmr');
        h.innerHTML = userStore.bodyStatus.BMR;
    }

    return (
        <div className="calculator w-screen bg-cyan-light min-h-screen">
            <div className="container grid grid-cols-4 pt-32 mx-auto">
                {
                    productStore.products.map((product) => (
                        <div key={product._id} className="shadow-lg rounded bg-white">
                            <img className="block w-1/2" />
                            <h2 className="m-o p-0">{product.foodType.split(',')[0]}</h2>
                        </div>
                    ))
                }
            </div>
            <div className="container mx-auto">
                <h2>Your age:</h2>
                <div className="w-32">
                    <Slider
                        min={1}
                        max={100}
                        onChange={handlerAgeSlider}
                        value={age}
                    />
                </div>
                <h2>Your gender:</h2>
                <Select defaultValue="male" style={{ width: 120 }} onChange={handlerGenderSelect}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
                <h2>Your height(cm):</h2>
                <div className="w-32">
                    <Slider defaultValue={170} tooltipVisible max={230} min={130} onChange={handlerHeightSlider}/>
                </div>
                <h2>Your weight(kg):</h2>
                <div className="w-32">
                    <Slider defaultValue={70} tooltipVisible max={160} min={40} onChange={handlerWeightSlider}/>
                </div>
                <button
                        className="bg-sky-light hover:bg-blue-light text-white font-bold py-2 px-4 rounded-full"
                        onClick={async () => await setDailyCalories()}
                >
                    Check daily calory requirements
                </button>
                <div>
                    <h1 id="bmr">Press the button</h1>
                </div>
            </div>
        </div>
    )
})

export default Calculator;