import {makeAutoObservable} from 'mobx'

class ProductStore{

    constructor() {
        makeAutoObservable(this)
    }

    products = [];
    userProducts = [];

    checkProductExistsInList(id) {
        return this.userProducts.includes(t => t._id === id);
    }

    addUserProduct(data){
        this.userProducts.push(data);
    }

    removeUserProduct(id){
        this.userProducts = this.userProducts.filter(t => t._id === id);
    }

    setProducts(data){
        this.products = data;
    }
}

export default new ProductStore();