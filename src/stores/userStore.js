import {makeAutoObservable} from "mobx";

const initialBodyStatus = JSON.parse(localStorage.getItem('stats-body-status'));
const initialWeightStatus = JSON.parse(localStorage.getItem('stats-ideal-weights'));

class UserStore{

    constructor() {
        makeAutoObservable(this);
    }

    bodyStatus;
    idealWeight;

    statsBodyStatus = initialBodyStatus !== null ? [...initialBodyStatus] : [];
    statsIdealWeights = initialWeightStatus !== null ? [...initialWeightStatus] : [];

    setDailyCaloryRequirements(data){
        data.dateTime = new Date().toDateString();
        this.bodyStatus = data;
        this.statsBodyStatus.push(data);
        localStorage.setItem('stats-body-status', JSON.stringify(this.statsBodyStatus));
    }

    setIdealWeight(data){
        data.dateTime = new Date().toDateString();
        this.idealWeight = data;
        this.statsIdealWeights.push(data);
        localStorage.setItem('stats-ideal-weights', JSON.stringify(this.statsIdealWeights));
    }


}

export default new UserStore();


