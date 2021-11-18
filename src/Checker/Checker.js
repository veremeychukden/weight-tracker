import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Select, Slider, Table} from "antd";
import {Option} from "antd/es/mentions";
import productService from "../services/productService";
import Zoom from "react-reveal/Zoom";
import checker from "../images/checker.svg";
import userStore from "../stores/userStore";


const Checker = observer(() => {

    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(170);

    const handlerGenderSelect = value => {
        setGender(value);
    }

    const handlerHeightSlider = value => {
        setHeight(value);
    }

    const setIdealWeight = async () => {
        await productService.getIdealWeight(gender, height);
        var h = document.getElementById('miller');
        h.innerHTML = 'Miller method perfect weight: ' + userStore.idealWeight.Miller + 'kg';
    }

    const weightColumns = [
        {
            title: 'Date',
            dataIndex: 'dateTime',
            key: 'weightDateTime',
            render: (text, record) => <div className="self-center">{record.dateTime}</div>
        },
        {
            title: 'Miller',
            dataIndex: 'Miller',
            key: 'weightMiller',
            render: (text, record) => <div className="self-center">{record.Miller}kg</div>
        }
    ];

    return(
        <div className="checker w-full bg-cyan-light min-h-screen">
            <div className="container mx-auto pt-32">
                <div className="text-white text-center font-bold text-5xl">Calculate your perfect weight</div>
            </div>
            <div className="container mx-auto grid grid-cols-2 gap-10 pt-28 ">
                <div className="block bg-blue-md p-12 rounded-xl self-center grid grid-cols-2">
                    <div className="cols-span-1">
                        <h2 className="text-white text-lg font-semibold">Select your gender:</h2>
                        <Select defaultValue="male" onChange={handlerGenderSelect}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                        <h2 className="text-white text-lg font-semibold mt-5">Your height(cm):</h2>
                        <div className="w-32">
                            <Slider defaultValue={170} max={230} min={130} onChange={handlerHeightSlider}/>
                        </div>
                        <h2 id="miller" className="self-center bg-white text-black text-lg font-semibold my-5 p-2 rounded-lg w-1/2">Miller Method ideal weight</h2>
                        <button
                            className="bg-blue-dark text-white font-bold py-2 px-4 rounded-lg w-1/2"
                            onClick={async () => await setIdealWeight()}
                        >
                            Check my ideal weight
                        </button>
                    </div>
                    <div className="col-span-1">
                        <Table title={() => 'Your statistics'} pagination={{ pageSize: 4}} columns={weightColumns} dataSource={[...userStore.statsIdealWeights]}/>
                    </div>

                </div>
                <Zoom>
                    <img className="w-3/4 self-center justify-self-end" src={checker} alt=""/>
                </Zoom>
            </div>
        </div>
    )
})

export default Checker;