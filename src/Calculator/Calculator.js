import {observer} from "mobx-react-lite";
import productStore from "../stores/productStore";
import {useEffect, useState} from "react";
import productService from "../services/productService";
import {Slider, Select, notification, Button} from 'antd';
import {Option} from "antd/es/mentions";
import userStore from "../stores/userStore";
import calculator from './../images/calculator.svg';
import {toJS} from "mobx";

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

    const handlerProductChoose = id => {
        var productElement = document.getElementById(id);
        console.log(productElement);
        productElement.classList.add("bg-blue-md");
        const product = toJS(productStore.products.find(t => t._id === id));
        productStore.addUserProduct(product)
        productElement.disabled = true;
    }

    const resetButtons = () => {
        for(let i = 0; i < productStore.userProducts.length; i++){
            var productElement = document.getElementById(productStore.userProducts[i]._id);
            productElement.disabled = false;
        }
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
        h.innerHTML = 'Your BMR: ' + userStore.bodyStatus.BMR + ' BMR';
    }

    return (
        <div className="calculator bg-cyan-light min-h-screen">
            <div className="container mx-auto pt-32">
                <div className="text-white text-center font-bold text-5xl">Choose products you eat today</div>
            </div>
            <div className="container mx-auto">
                <Button onClick={resetButtons}>Reset</Button>
            </div>
            <div className="container grid grid-cols-6 gap-5 pt-16 mx-auto">
                {
                    productStore.products.map((product) => (
                        <Button onClick={() => handlerProductChoose(product._id)} id={product._id} key={product._id} className="cursor-pointer shadow-lg rounded bg-blue-md justify-self-center self-center w-full">
                            {product.foodType.split(',')[0]}
                        </Button>
                    ))
                }
            </div>
            <div className="container mx-auto pt-16">
                <div className="text-white text-center font-bold text-5xl">Calculate your BMR</div>
            </div>
            <div className="container mx-auto mt-16 pb-16">
                <div className="grid grid-cols-2">
                    <div className="col-span-1 grid grid-cols-2 bg-blue-md rounded-lg p-16">

                        <h2 className="text-white text-lg font-semibold">Your age:</h2>
                        <div className="w-64">
                            <Slider
                                min={1}
                                max={100}
                                onChange={handlerAgeSlider}
                                value={age}
                            />
                        </div>
                        <h2 className="text-white text-lg font-semibold">Your gender:</h2>
                        <Select defaultValue="male" style={{ width: '16rem' }} onChange={handlerGenderSelect}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                        <h2 className="text-white text-lg font-semibold">Your height (cm):</h2>
                        <div className="w-64">
                            <Slider defaultValue={170} max={230} min={130} onChange={handlerHeightSlider}/>
                        </div>
                        <h2 className="text-white text-lg font-semibold">Your weight (kg):</h2>
                        <div className="w-64">
                            <Slider defaultValue={70} max={160} min={40} onChange={handlerWeightSlider}/>
                        </div>
                        <button
                            className="bg-blue-dark text-white font-semibold py-2 px-4 rounded-lg w-64"
                            onClick={async () => await setDailyCalories()}
                        >
                            Check daily calory requirements
                        </button>
                        <div className="self-center" >
                            <div className="text-white font-semibold text-xl" id="bmr">Your BMR: </div>
                        </div>
                    </div>
                    <img className="justify-self-end" src={calculator} alt=""/>
                </div>

            </div>
        </div>
    )
})

export default Calculator;