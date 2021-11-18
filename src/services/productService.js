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

            // for(let i = 0; i < response.data.data.length; i++){
            //     const response2 = await axios.get('https://api.pexels.com/v1/search', {
            //         headers: {
            //             'Authorization': '563492ad6f91700001000001b243e5a7011245c09a73cc06d966bab8'
            //         },
            //         params: {
            //             query: response.data.data[i].foodType.split(',')[0],
            //             page: 1,
            //             perPage: 1
            //         }
            //     });
            //     response.data.data[i].imageSrc =  response2.data.photos[0].src.medium;
            // }
            productStore.setProducts(response.data.data);
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
            userStore.setIdealWeight(response.data.data);
        }catch (err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

}

export default new ProductService();