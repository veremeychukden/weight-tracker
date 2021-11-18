import {makeAutoObservable} from 'mobx'

class ProductStore{

    constructor() {
        makeAutoObservable(this)
    }

    products = [];


    setProducts(data){
        this.products = data;
    }



}

export default new ProductStore();