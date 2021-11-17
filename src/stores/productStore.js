import {makeAutoObservable} from 'mobx'

class ProductStore{

    constructor() {
        makeAutoObservable(this)
    }

    products = [];
    bodyStatus;

    setProducts(data){
        this.products = data;
    }

    setDailyCaloryRequirements(data){
        this.bodyStatus = data;
    }

}

export default new ProductStore();