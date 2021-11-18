import apiStore from "../stores/apiStore";
import axios from "axios";
import productStore from "../stores/productStore";
import userStore from "../stores/userStore";

class ProductService{
    async getProducts(){
        try {
            apiStore.setIsFetching(true);
            var options = {
                url: 'https://fitness-calculator.p.rapidapi.com/foodids',
                params: {subtablename: 'Fo1_2'},
                headers: {
                    'x-rapidapi-host': 'fitness-calculator.p.rapidapi.com',
                    'x-rapidapi-key': '3a9f0bd8d9mshfc9e7e523461d44p1f6058jsn8c7cf1b518af'
                }
            };
            const response = await axios.get('https://fitness-calculator.p.rapidapi.com/foodids', options);
            const result = response.data.data.filter((v, i, a) => a.findIndex(t => (t.foodType.split(',')[0] === v.foodType.split(',')[0])) === i);
            productStore.setProducts(result);
        }catch (err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async getDailyCaloriesRequirements(age, gender, height, weight, activitylevel){
        try{
            apiStore.setIsFetching(true);
            var options = {
                url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
                params: {age, gender, height, weight, activitylevel},
                headers: {
                    'x-rapidapi-host': 'fitness-calculator.p.rapidapi.com',
                    'x-rapidapi-key': '3a9f0bd8d9mshfc9e7e523461d44p1f6058jsn8c7cf1b518af'
                }
            };
            const response = await axios.get('https://fitness-calculator.p.rapidapi.com/dailycalorie', options);
            userStore.setDailyCaloryRequirements(response.data.data);
        }catch (err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async getIdealWeight(gender, height){
        try{
            apiStore.setIsFetching(true);
            var options = {
                url: 'https://fitness-calculator.p.rapidapi.com/idealweight',
                params: {gender, height},
                headers : {
                    'x-rapidapi-host': 'fitness-calculator.p.rapidapi.com',
                    'x-rapidapi-key': '3a9f0bd8d9mshfc9e7e523461d44p1f6058jsn8c7cf1b518af'
                }
            };
            const response = await axios.get('https://fitness-calculator.p.rapidapi.com/idealweight', options);
            console.log(response)
            userStore.setIdealWeight(response.data.data);
        }catch (err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

}

export default new ProductService();