import {observer} from "mobx-react-lite";
import runner from './../images/runner.svg';
import Zoom from 'react-reveal/Zoom';
import Fade from "react-reveal/Fade";

const Home = observer(()=> {
    return (
        <div className="home w-screen h-screen bg-cyan-light">
            <div className="container h-screen mx-auto grid grid-cols-2 gap-10">
                <div className="self-center">
                    <Fade delay={500}>
                        <h2 className="text-white font-bold text-5xl">Map your fitness and nutrition</h2>
                    </Fade>
                    <Fade delay={750}>
                        <p className="text-lg font-medium text-white mt-5 text-justify">
                            Eating a well-balanced diet can help you get the calories and nutrients you need to
                            fuel your daily activities, including regular exercise. When it comes to eating foods
                            to fuel your exercise performance, it’s not as simple as choosing vegetables over doughnuts.
                            You need to eat the right types of food at the right times of the day.
                        </p>
                    </Fade>
                </div>
                <Zoom delay={500}>
                    <img className="self-center" src={runner} alt=""/>
                </Zoom>
            </div>
        </div>
    )
})

export default Home;