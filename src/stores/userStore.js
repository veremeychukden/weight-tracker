import {makeAutoObservable} from "mobx";

class UserStore{

    constructor() {
        makeAutoObservable(this);
    }
    bodyStatus;
    idealWeight;

    setDailyCaloryRequirements(data){
        this.bodyStatus = data;
    }

    setIdealWeight(data){
        this.idealWeight = data;
    }


}

export default new UserStore();


