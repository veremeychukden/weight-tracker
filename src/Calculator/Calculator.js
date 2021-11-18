import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import productService from "../services/productService";
import {Slider, Select, Table} from 'antd';
import {Option} from "antd/es/mentions";
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
        h.innerHTML = 'Your BMR: ' + userStore.bodyStatus.BMR + ' kcal';
    }

    const calorieColumns = [
        {
            title: 'Date',
            dataIndex: 'dateTime',
            key: 'calorieDateTime',
            render: (text, record) => <div className="self-center">{record.dateTime}</div>
        },
        {
            title: 'BMR',
            dataIndex: 'BMR',
            key: 'calorieBMR',
            render: (text, record) => <div className="self-center">{record.BMR}kcal</div>
        }
    ];

    return (
        <div className="calculator bg-cyan-light min-h-screen">
            <div className="container mx-auto pt-32">
                <div className="text-white text-center font-bold text-5xl">Calculate your BMR</div>
            </div>
            <div className="container mx-auto mt-16 pb-16">
                <div className="grid grid-cols-2 gap-12">
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
                            Check daily calorie requirements
                        </button>
                        <div className="self-center" >
                            <div className="text-white font-semibold text-xl" id="bmr">Your BMR: </div>
                        </div>
                    </div>
                    <Table title={() => 'Your statistics'} pagination={{ pageSize: 4}} columns={calorieColumns} dataSource={[...userStore.statsBodyStatus]}/>
                </div>
            </div>
        </div>
    )
})

export default Calculator;